import Navbar from "../../components/navbar/Navbar.jsx";
import RenderCard from "../../components/render-card/RenderCard.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";
import {Typography} from "antd";

const {Title} = Typography

const Home = () => {
  const [{payload}] = useFetch("/product/most-popular")
  console.log(payload)
  return (
    <div>
      <Navbar/>

      <div className="my-[100px]">
        <Title className="text-center block pb-2">Products</Title>
        <div className="max-w-[1200px] w-full grid grid-cols-4 gap-3 m-auto mt-4">
          {
            payload && payload?.map(product =>
              <RenderCard key={product._id} product={product}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default Home
