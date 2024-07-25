import {Navigate, useRoutes} from "react-router-dom";
import {lazy, useEffect, useState} from "react";
import {SuspenseElement as Suspense} from "../utils/Index.jsx";
import {useSelector} from "react-redux";

const Home = lazy(() => import("./home/Home.jsx"))
const Auth = lazy(() => import("./auth/Auth.jsx"))
const Login = lazy(() => import("./auth/login/Login.jsx"))
const Register = lazy(() => import("./auth/register/Register.jsx"))
const Dashboards = lazy(() => import("./dashboard/Dashboard.jsx"))
const Products = lazy(() => import("./dashboard/products/Products.jsx"))
const Users = lazy(() => import("./dashboard/users/Users.jsx"))
const Protected = lazy(() => import("./protected/Protected.jsx"))
const LikedProducts = lazy(() => import("./dashboard/liked-products/LikedProducts.jsx"))
const Profile = lazy(() => import("./dashboard/profile/Profile.jsx"))
const NotFound = lazy(() => import("./not-found/NotFound.jsx"))

const RouteController = () => {
  const authData = useSelector(state => state)
  const [role, setRole] = useState(null)
  useEffect(() => {
    if (authData && authData?.token) {
      setRole(JSON.parse(atob(authData?.token?.split(".")[1]))?.user.role)
    }
  }, [authData])

  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "auth",
      element: authData.token ? <Navigate to="/dashboard"/>: <Suspense><Auth/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Login/></Suspense>
        },
        {
          path: "register",
          element: <Suspense><Register/></Suspense>
        }
      ]
    },
    {
      path: "dashboard",
      element: <Suspense><Protected/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense>{role === "user" && <Navigate to="liked-products"/>}<Dashboards/></Suspense>,
          children: [
            {
              index: true,
              path: "",
              element: role && role === "admin" && <Suspense><Products/></Suspense>
            },
            {
              path: "users",
              element: role && role === "admin" && <Suspense><Users/></Suspense>
            },
            {
              index: true,
              path: "liked-products",
              element: <Suspense><LikedProducts/></Suspense>
            },
            {
              path: "profile",
              element: <Suspense><Profile/></Suspense>
            }
          ]
        }
      ]
    },
    {
      path: "notfound",
      element: <Suspense><NotFound/></Suspense>
    },
    {
      path: "*",
      element: <Suspense><Navigate to="notfound"/></Suspense>
    }
  ])
}
export default RouteController
