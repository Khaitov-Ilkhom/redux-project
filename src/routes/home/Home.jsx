import Navbar from "../../components/navbar/Navbar.jsx";
import RenderCard from "../../components/render-card/RenderCard.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";
import {Typography} from "antd";
import {useState} from "react";

const {Title} = Typography

const Home = () => {
  const [trigger, setTrigger] = useState(false)

  const [{payload}] = useFetch("/product/all", trigger)
  return (
    <div>
      <Navbar/>

      <div className="my-[100px]">
        <Title className="text-center block pb-2">Products</Title>
        <div className="max-w-[1300px] w-full grid grid-cols-4 gap-4 m-auto mt-4">
          {
            payload && payload?.map(product =>
              <RenderCard key={product._id} product={product} trigger={trigger} setTrigger={setTrigger}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default Home
