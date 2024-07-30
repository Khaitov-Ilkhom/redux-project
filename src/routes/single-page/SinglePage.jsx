import "./SinglePage.css"
import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {SlBasketLoaded} from "react-icons/sl";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useRef, useState} from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import {Carousel, Image} from "antd";

const SinglePage = () => {
  const {id} = useParams();
  const [like, setLike] = useState(false)
  const [stock, setStock] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const [data] = useFetch(`/product/single-product/${id}`);

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="max-w-[1200px]  my-[100px] m-auto">
        <div className="border flex justify-center items-center p-[40px] shadow-form rounded-2xl">
          <div className="flex items-center gap-6 p-[20px]">
            <div className="flex flex-col gap-3 ">
              {data?.payload?.product_images?.map((image, index) => (
                <div onClick={() => carousel.current.goTo(index)}
                     className={currentIndex === index ? "image_card_active" : "image_card"} key={index}>
                  <img src={image} className="scale-75 max-w-[100px]" alt="image"/>
                </div>
              ))}
            </div>
            <div className="rounded-3xl w-[400px] bg-gray-300">
              <Carousel afterChange={(current) => setCurrentIndex(current)} ref={carousel} arrows autoplay
                        autoplaySpeed={3000} infinite={true} fade>
                {data?.payload?.product_images?.map((image, index) => (
                  <div className="rounded-3xl overflow-hidden " key={index}>
                    <Image src={image} className="scale-75 transition-transform hover:scale-90" alt="image"/>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {data.payload?.product_name}
            </h2>
            <div className="mt-4 flex items-center">
                    <span className="text-lg font-semibold text-green-500">
                      ${data.payload?.sale_price}
                    </span>
              <span className="ml-2 text-sm text-red-500 line-through">
                      ${data.payload?.original_price}
                    </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {data.payload?.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {data.payload?.product_type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>In Stock:</strong> {data.payload?.number_in_stock}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Likes:</strong> {data.payload?.likes}
              </p>
              <p className="mt-2 text-gray-600">
                {data.payload?.description}
              </p>
            </div>
            <div className="py-3 border-b-2 ">
              <div className="w-full flex justify-between items-center">
                <div
                  className="bg-[#f6f7f8] max-w-[140px] w-full flex justify-between px-4 py-2 font-bold rounded-lg">
                  <button onClick={() => setStock(stock > 1 ? stock - 1 : stock)} className="text-sky-400">-
                  </button>
                  <span>{stock}</span>
                  <button onClick={() => setStock(stock > 0 ? stock + 1 : stock)} className="text-sky-400">+
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="bg-sky-100 text-sky-400 py-2 px-4 flex items-center rounded-lg gap-3">
                    <span><SlBasketLoaded/></span> Add To Cart
                  </button>
                  <button onClick={() => setLike(!like)}
                          className="bg-sky-100 text-sky-400 p-3 rounded-lg">{like ?
                    <span><FaRegHeart/></span> :
                    <span className="text-red-600"><FaHeart/></span>}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;