import {Button, Carousel} from "antd";
import axios from "../../api/Index.jsx"
import {FaRegHeart, FaHeart} from "react-icons/fa";
import {useFetch} from "../../hooks/useFetch.jsx";
import {useNavigate} from "react-router-dom";

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
    <div className='product_card mb-5 border rounded-2xl shadow-form p-4'>
      <div className='relative h-[300px] bg-[#F0EEED] rounded-3xl overflow-hidden text-center'>
        <Button disabled={loading}
                className="absolute top-2 right-2 z-10 shadow-form w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center"
                onClick={() => likedAndUnlikedProduct(product)}>
          {product.likedby.includes(data.payload?.username) ? <FaHeart className="text-red-500" size={30}/> :
            <FaRegHeart className="text-red-500" size={30}/>}
        </Button>

        <Carousel autoplay autoplaySpeed={3000} effect="fade">
          {product?.product_images?.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <img className="h-[300px] object-contain" src={image} alt="Image"/>
            </div>
          ))}
        </Carousel>
      </div>

      <div className='flex flex-col justify-center text-center gap-2 mt-3 px-2'>
        <span className="line-clamp-1">{product.product_name}</span>
        <div className="items-center justify-center flex gap-4">
          <span className="text-green-500">{`$${product.sale_price}`}</span>
          <span className="line-through text-red-500">{`$${product.original_price}`}</span>
        </div>
        <div className="w-full h-[1px] bg-slate-300 my-2"></div>
        <div className="flex justify-center  mb-5">
          <Button onClick={() => navigate(`/single-page/${product._id}`)} type="link">More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
export default RenderCard
