import {useFetch} from "../../../hooks/useFetch.jsx";
import {Image, Typography} from 'antd';
import {ContentTitle} from "../../../utils/Index.jsx";
import avatar from "../../../images/avatar-removebg-preview.png"

const {Title} = Typography
const Profile = () => {
  const [{payload}] = useFetch("/auth/profile")
  return (
    <div>
      <ContentTitle>Profile 🧑🏻‍💻</ContentTitle>

      <div>
        <div className="flex items-center gap-5 bg-slate-300 rounded-2xl">
          <div className="rounded-full">
            <Image
              className="rounded-full max-w-[300px]"
              src={payload?.photo_url ? payload?.photo_url : avatar}
            />
          </div>
          <div>
            <Title className=" userInfo py-1" level={4}>Firstname: <span className="text-[18px] underline">{payload?.first_name}</span></Title>
            <Title className="font-[Poppins] userInfo py-1" level={4}>Username: <span className="text-[18px] underline">{payload?.username}</span></Title>
            <Title className="font-[Poppins] userInfo py-1" level={4}>Role: <span className="text-[18px] underline">{payload?.role}</span></Title>
            <Title className="font-[Poppins] userInfo py-1" level={4}>Registered-At: <span className="text-[16px] underline">{new Date(payload?.registeredAt).toLocaleDateString('uz-UZ', {timeZone: 'Asia/Tashkent'})}</span></Title>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
