import {ContentTitle} from "../../../utils/Index.jsx";
import {Button} from "antd";

const Users = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ContentTitle>Users</ContentTitle>
        <Button type="primary">Add new user</Button>
      </div>
    </div>
  )
}
export default Users
