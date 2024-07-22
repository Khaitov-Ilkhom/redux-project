import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../utils/Index.jsx";

const Home = lazy(() => import("./home/Home.jsx"))
const Auth = lazy(() => import("./auth/Auth.jsx"))
const Login = lazy(() => import("./auth/login/Login.jsx"))
const Register = lazy(() => import("./auth/register/Register.jsx"))

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "auth",
      element: <Suspense><Auth/></Suspense>,
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
    }
  ])
}
export default RouteController
