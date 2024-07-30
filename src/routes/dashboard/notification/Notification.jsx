import {BiTrash} from "react-icons/bi";
import {FiEdit2} from "react-icons/fi";
import {IoMdCheckmark} from "react-icons/io";
import {useEffect, useState} from "react";
import {Input, Button, notification} from "antd";
import {SendOutlined} from "@ant-design/icons";
import axios from "../../../api/Index.jsx";

const Notification = () => {
  const [message, setMessage] = useState("");
  const [notificationsList, setNotificationsList] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications/all");
      setNotificationsList(res.data.payload);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "There was an error loading news!",
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    try {
      const res = await axios.post("/notifications/create", {message});
      console.log(res.data.paload);
      notification.success({
        message: "Successfully",
        description: "Notification successfully send!",
      });
      setMessage("");
      fetchNotifications();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "There was a problem deleting the notification!",
      });
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const res = await axios.delete(`/notifications/delete/${id}`);
      console.log(res);
      notification.success({
        message: "Successfully",
        description: "Notification deleted!",
      });
      fetchNotifications();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "There was a problem deleting the notification!",
      });
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await axios.patch("/notifications/update", {
        id,
        active: false,
      });
      console.log(res);
      notification.success({
        message: "Successfully",
        description: "Notification marked as read!",
      });
      fetchNotifications();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Notification marked as read!",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 p-2">
      <div className="flex items-center gap-5">
        <Input
          placeholder="Write a notification..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-2/3 border-2 border-lime-500 text-lg"
          size="large"
        />
        <Button
          type="primary"
          icon={<SendOutlined/>}
          className="border-none"
          onClick={handleSendNotification}
          size="large"
        >
          Send Notification
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-lime-700">
          All notifications
        </h1>
        <ul className="flex flex-col gap-2 ">
          {notificationsList.map((notificationItem) => (
            <li
              key={notificationItem._id}
              className={
                notificationItem.active
                  ? "flex items-center justify-between gap-2 rounded-md border-l-4 border-lime-600 bg-white p-2 shadow-2xl"
                  : "flex items-center justify-between gap-2 rounded-md border-l-4 border-lime-400 bg-white p-2 shadow-2xl"
              }
            >
              <div className="flex flex-col gap-2">
                <span
                  className={
                    notificationItem.active === true
                      ? "text-md font-semi bold text-lime-800"
                      : "text-md text-lime-700"
                  }
                >
                  {notificationItem.message}
                </span>
                <span
                  className={
                    notificationItem.active === true
                      ? "text-sm font-semibold text-lime-500"
                      : "text-sm text-lime-500"
                  }
                >
                  {new Date(
                    notificationItem.announcedDate,
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {notificationItem.active && (
                  <Button
                    type="primary"
                    icon={<IoMdCheckmark/>}
                    onClick={() => handleMarkAsRead(notificationItem._id)}
                  >
                    Mark as read
                  </Button>
                )}
                <Button type="primary" icon={<FiEdit2/>}>
                  Edit Notification
                </Button>
                <Button
                  danger
                  type="primary"
                  icon={<BiTrash/>}
                  onClick={() => handleDeleteNotification(notificationItem._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;