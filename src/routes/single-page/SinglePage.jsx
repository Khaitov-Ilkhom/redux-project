import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {SlBasketLoaded} from "react-icons/sl";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";
import Navbar from "../../components/navbar/Navbar.jsx";

const SinglePage = () => {
  const {id} = useParams();
  const [like, setLike] = useState(false)
  const [stock, setStock] = useState(1)

  const [data, loading] = useFetch(`/product/single-product/${id}`);

  return (
    <div className="min-h-screen">
      <Navbar/>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 my-[100px]">
          <div className="overflow-hidden bg-white shadow-form rounded-2xl">
            <div className="border-b border-gray-200 bg-white p-6 sm:px-20">
              <div className="mt-8 flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={data.payload?.product_images[0]} alt={data.payload?.product_name}
                    className="h-auto w-full rounded-2xl object-cover shadow-form"
                  />
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
        </div>
      </main>
    </div>
  );
};

export default SinglePage;