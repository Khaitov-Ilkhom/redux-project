import { Button, Modal, notification } from "antd";
import { ContentTitle } from "../../../utils/Index.jsx";
import { useState } from "react";
import axios from "../../../api/Index.jsx";
import DashboardContent from "../../../components/dashboardContent/DashboardContent.jsx";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [userToPromote, setUserToPromote] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    try {
      const res = await axios.post("admin/add-admin", {
        username: userToPromote.username, // Replace with the correct field from your user object
      });

      notification.success({
        message: 'User Promoted',
        description: 'User has been promoted.',
      });

      setTimeout(() => {
        location.reload(); // You might want to consider a more controlled way to update your table
      }, 200);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Failed to promote user.',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeUserPromotion = (user) => {
    setUserToPromote(user);
    showModal();
  };

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (text, record, index) =>
        tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
      width: '10%',
    },
    {
      key: "First_name",
      title: 'Firstname',
      dataIndex: 'first_name',
      sorter: true,
    },
    {
      key: "Last_name",
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      key: "Role",
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
    },
    {
      key: "Created_at",
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      sorter: true,
    },
    {
      key: "Action",
      title: 'Action',
      render: (user) => (
        <Button type="primary" onClick={() => handleChangeUserPromotion(user)}>Promote</Button>
      ),
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <ContentTitle>Users 👤</ContentTitle>
      </div>
      <DashboardContent
        columns={columns}
        tableParams={tableParams}
        setTableParams={setTableParams}
        url="/admin/registered-users"
      />
      <Modal
        maskClosable={false}
        title="Promote User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to promote {userToPromote?.username}?</p>
      </Modal>
    </div>
  );
};

export default Users;






























// import {ContentTitle} from "../../../utils/Index.jsx";
// import {Button} from "antd";
// import DashboardContent from "../../../components/dashboardContent/DashboardContent.jsx";
// import {useState} from "react";
//
// const Users = () => {
//   const [tableParams, setTableParams] = useState({
//     pagination: {
//       current: 1,
//       pageSize: 5,
//     },
//   });
//
//   const columns = [
//     {
//       title: 'No.',
//       key: "id",
//       render: (text, record, index) =>
//         tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
//       width: '10%',
//     },
//     {
//       key: "First_name",
//       title: 'Firstname',
//       dataIndex: 'first_name',
//       sorter: true,
//     },
//     {
//       key: "Last_name",
//       title: 'Username',
//       dataIndex: 'username',
//       sorter: true,
//     },
//     {
//       key: "Role",
//       title: 'Role',
//       dataIndex: 'role',
//       sorter: true,
//     },
//     {
//       key: "Created_at",
//       title: 'Created At',
//       dataIndex: 'createdAt',
//       render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
//       sorter: true,
//     },
//     {
//       key: "Action",
//       title: 'Action',
//       render: (user) => (
//         <Button type="primary">Promote</Button>
//       // onClick={() => handleChangeUserPromotion(user)}
//       ),
//       width: "10%"
//     }
//   ];
//
//   return (
//     <div>
//       <div className="flex justify-between">
//         <ContentTitle>Users</ContentTitle>
//         <Button type="primary">Add new user</Button>
//       </div>
//       <DashboardContent columns={columns} setTableParams={setTableParams} tableParams={tableParams} url="/admin/registered-users" />
//     </div>
//   )
// }
// export default Users
