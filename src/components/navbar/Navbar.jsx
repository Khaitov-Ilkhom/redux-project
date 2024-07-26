import {Link, NavLink} from "react-router-dom";
import {BiSearchAlt} from "react-icons/bi";
import logo from "../../images/logo.svg"
import {FaRegHeart} from "react-icons/fa";
import {SlBasket} from "react-icons/sl";

const Navbar = () => {
  return (
    <nav
      className="w-full h-[80px] shadow-2xl flex items-center text-gray-700 text-lg font-bold py-5 bg-[#ffffff29] fixed top-0 left-0 z-10 backdrop-blur-3xl">
      <ul className="w-full flex justify-around items-center gap-4">
        <li><NavLink to=""><img className="w-[200px]" src={logo} alt="logo"/></NavLink></li>
        <li className="font-['Lato'] flex justify-center items-center gap-2 py-1 px-3 bg-blue-50 rounded-lg shadow-md">
          <input className="outline-none bg-transparent" type="text" placeholder="Search..."/> <BiSearchAlt/></li>
        <li className="flex items-center gap-4"><FaRegHeart/> <Link className="relative" to={''}><SlBasket/> <span
          className="w-5 h-5 flex font-semibold items-center justify-center text-white text-xs -top-3 -right-3  bg-rose-500 absolute rounded-full"></span>
        </Link></li>
        <li className="active:scale-90 transition duration-500"><NavLink className="text-white bg-emerald-600 rounded-2xl px-5 py-2" to="auth">Login</NavLink></li>
      </ul>
    </nav>
  )
}
export default Navbar
