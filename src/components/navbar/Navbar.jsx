import {Link, NavLink} from "react-router-dom";
import logo from "../../images/logo.svg"
import {FaRegHeart} from "react-icons/fa";
import {SlBasket} from "react-icons/sl";
import {AutoComplete} from "antd";
import {useState} from "react";
import axios from "../../api/Index.jsx";


const Navbar = () => {
  const [searchData, setSearchData] = useState([{payload: []}])
  const loadData = async (Text) => {
    try {
      const res = await axios(`/product/search/${Text}`)
      setSearchData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return (
    <nav
      className="w-full h-[80px] shadow-2xl flex items-center text-gray-700 text-lg font-bold py-5 bg-[#ffffff29] fixed top-0 left-0 z-20 backdrop-blur-3xl">
      <ul className="w-full flex justify-around items-center gap-4">
        <li><NavLink to=""><img className="w-[200px]" src={logo} alt="logo"/></NavLink></li>
        <li className="font-['Lato'] shadow-md">
          <AutoComplete
            options={searchData?.payload?.map(item => ({
                label: <Link key={item._id} to={`/single-page/${item._id}`}>{item.product_name}</Link>
              })
            )}
            style={{width: "200px"}}
            onSelect={onSelect}
            onSearch={(text) => text ? loadData(text) : setSearchData({payload: []})}
            placeholder="input here"
          />
        </li>
        <li className="flex items-center gap-4">
          <NavLink to="/dashboard/liked-products"><FaRegHeart/></NavLink>
          <NavLink className="relative" to="/dashboard/carts"><SlBasket/>
          <span className="w-5 h-5 flex font-semibold items-center justify-center text-white text-xs -top-3 -right-3  bg-rose-500 absolute rounded-full"></span>
        </NavLink>
        </li>
        <li className="active:scale-90 transition duration-500"><NavLink
          className="text-white bg-emerald-600 rounded-2xl px-5 py-2" to="auth">Login</NavLink></li>
      </ul>
    </nav>
  )
}
export default Navbar
