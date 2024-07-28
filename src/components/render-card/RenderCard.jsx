import {Button, Card, Carousel} from "antd";
import axios from "../../api/Index.jsx"
import {FaRegHeart, FaHeart} from "react-icons/fa";
import {useFetch} from "../../hooks/useFetch.jsx";
import {useNavigate} from "react-router-dom";

const {Meta} = Card

const RenderCard = ({product, trigger, setTrigger}) => {
  const navigate = useNavigate()
  const [data, loading] = useFetch("/auth/profile")


  const likedAndUnlikedProduct = async (products) => {
    try {
      const response = await axios.patch(`/product/${products._id}/${product.likedby.includes(data?.payload?.username) ? "unlike" : "like"}`)
      setTrigger(!trigger)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Card
        hoverable
        className="relative shadow-xl h-[350px] flex justify-center flex-col items-center group hover:scale-105 transition duration-500"
        cover={<img className="max-w-[270px] h-[200px] object-cover py-2 group-hover:scale-90 transition duration-500"
                    src={product.product_images[0]} alt={product.product_name}/>}
        actions={[
          <Button onClick={() => navigate(`/single-page/${product._id}`)} type="link">More Info</Button>
        ]}
      >
        <Button disabled={loading}
                className="absolute top-2 right-2 shadow-form w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center"
                onClick={() => likedAndUnlikedProduct(product)}>
          {product.likedby.includes(data.payload?.username) ? <FaHeart className="text-red-500" size={30}/> :
            <FaRegHeart className="text-red-500" size={30}/>}
        </Button>
        <Meta
          title={product.product_name}
          description={<div className="items-center flex gap-4"><span
            className="text-green-500">{`$${product.sale_price}`}</span> <span
            className="line-through text-red-500">{`$${product.original_price}`}</span></div>}
        />
      </Card>
    </div>
  )
}
export default RenderCard
