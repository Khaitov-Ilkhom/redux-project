import "./Sidebar.css"
import {Layout, Menu, Skeleton, Typography} from "antd";
import {UserOutlined, ProductOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {Avatar, Badge, Space} from 'antd';

const {Text} = Typography
const {Sider} = Layout;

const Sidebar = ({collapsed, userProfileData, loading}) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="py-7 px-2">
      <div className="flex items-center gap-5 p-3 overflow-hidden whitespace-nowrap">
        <Badge count={1}>
          {
            loading ? <Skeleton.Avatar active size="large" className="rounded-full bg-slate-500"/>
              : <Avatar className="bg-amber-500">{userProfileData?.first_name.at(0)}</Avatar>
          }
        </Badge>
        {
          loading ? <div>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded h-[20px]"/>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded max-w-[50px] h-[20px]"/>
            </div> :
            <Text className="text-white flex-col flex justify-center gap-1">
              <span className="text-[16px] leading-[12px]">{loading ? "Loading..." : userProfileData?.first_name.split(" ")[0]}</span>
              <span className="text-3">{userProfileData?.role}</span>
            </Text>
        }
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: '1',
            icon: <ProductOutlined />,
            label: <NavLink end to="/dashboard">Products</NavLink>,
          },
          {
            key: '2',
            icon: <UserOutlined/>,
            label: <NavLink to="/dashboard/users">Users</NavLink>,
          }
        ]}
      />
    </Sider>
  )
}
export default Sidebar
