import { createBrowserRouter } from "react-router-dom";
import Buyers from "../Dashboard/Buyers";
import Dashboard from "../Dashboard/Dashboard";
import MyOrders from "../Dashboard/MyOrders";
import Sellers from "../Dashboard/Sellers";
import ErrorElement from "../ErrorElement/ErrorElement";
import Main from "../Layouts/Main";
import AdvertisedProducts from "../Pages/Home/AdvertisedProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/advertisedProducts",
        element: <AdvertisedProducts></AdvertisedProducts>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/dashboard/buyers",
        element: <Buyers></Buyers>,
      },
      {
        path: "/dashboard/sellers",
        element: <Sellers></Sellers>,
      },
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
    ],
  },
]);

export default router;
