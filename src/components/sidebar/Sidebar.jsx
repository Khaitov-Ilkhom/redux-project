import "./Sidebar.css"
import {Button, Layout, Menu, Modal, notification, Skeleton, Typography} from "antd";
import {ProductOutlined, HomeOutlined} from '@ant-design/icons';
import {NavLink, useNavigate} from "react-router-dom";
import {Avatar, Badge} from 'antd';
import {SIGN_OUT} from "../../redux/action/Types.jsx";
import {useEffect, useState} from "react";
import {BsBox2Heart, BsFillDoorOpenFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {FaUser} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {SlBasket} from "react-icons/sl";
import { IoNotifications } from "react-icons/io5";
import axios from "../../api/Index.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";


const {Text} = Typography
const {Sider} = Layout;

const Sidebar = ({collapsed, userProfileData, loading}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("You will be signed out");
  const [notification, setNotification] = useState(null)
  const role = userProfileData?.role
  const [trigger, setTrigger] = useState(false)
  const [notificationCount] = useFetch("/notifications/all", trigger)

  useEffect(() => {
    if (notificationCount) {
      setNotification(notificationCount?.payload?.length)
    } setTrigger(!trigger)
  }, [notificationCount, trigger])

  const handleOk = () => {
    setModalText("Signed out successfully");
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
    dispatch({type: SIGN_OUT});
    navigate("/auth");

    notification.success({
      message: 'Signed out successfully',
      description: 'You have been signed out successfully.',
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSingOut = () => {
    setOpen(true);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="py-7 px-2">
      <div className="flex items-center gap-5 p-3 overflow-hidden whitespace-nowrap">
        <Badge count={notification}>
          {
            loading ? <Skeleton.Avatar active size="large" className="rounded-full bg-slate-500"/>
              : <>{userProfileData && userProfileData.photo_url ? <img src={userProfileData.photo_url} alt={userProfileData.username}/> : <Avatar className="bg-amber-500">{userProfileData?.first_name.at(0)}</Avatar>}</>
          }
        </Badge>
        {
          loading ? <div>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded h-[20px]"/>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded max-w-[50px] h-[20px]"/>
            </div> :
            <Text className="text-white flex-col flex justify-center gap-1">
              <span
                className="text-[16px] leading-[12px]">{loading ? "Loading..." : userProfileData?.first_name.split(" ")[0]}</span>
              <span className="text-3">{userProfileData?.role}</span>
            </Text>
        }
      </div>
      <div className="flex flex-col justify-between flex-1">
        <Menu
          theme="dark"
          mode="inline"
          items={role === "admin" ? [
            {
              key: '1',
              icon: <HomeOutlined/>,
              label: <NavLink to="/">Home</NavLink>
            },
            {
              key: '2',
              icon: <FaUser/>,
              label: <NavLink to="/dashboard/profile">Profile</NavLink>
            },
            {
              key: '3',
              icon: <ProductOutlined/>,
              label: <NavLink end to="/dashboard">Products</NavLink>,
            },
            {
              key: '4',
              icon: <FaUsers/>,
              label: <NavLink to="/dashboard/users">Users</NavLink>,
            },
            {
              key: '5',
              icon: <BsBox2Heart/>,
              label: <NavLink to="/dashboard/liked-products">Liked products</NavLink>
            },
            {
              key: '6',
              icon: <SlBasket/>,
              label: <NavLink to="/dashboard/carts">Carts</NavLink>
            },
            {
              key: '7',
              icon: <IoNotifications/>,
              label: <NavLink to="/dashboard/notification">Notification</NavLink>
            }
          ] : [
            {
              key: '1',
              icon: <HomeOutlined/>,
              label: <NavLink to="/">Home</NavLink>
            },
            {
              key: '2',
              icon: <FaUser/>,
              label: <NavLink to="/dashboard/profile">Profile</NavLink>
            },
            {
              key: '3',
              icon: <BsBox2Heart/>,
              label: <NavLink to="/dashboard/liked-products">Liked products</NavLink>
            },
            {
              key: '4',
              icon: <SlBasket/>,
              label: <NavLink to="/dashboard/carts">Carts</NavLink>
            }
          ]}
        />
        <Button
          className="mt-auto mx-2 whitespace-normal"
          danger
          type="primary"
          onClick={handleSingOut}
        >

          {!collapsed && (
            <span className="text-[12px]">Sign Out </span>
          )}
          <span><BsFillDoorOpenFill/></span>
        </Button>
      </div>
      <Modal
        maskClosable={false}
        title="Sign Out"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Sider>
  )
}
export default Sidebar
