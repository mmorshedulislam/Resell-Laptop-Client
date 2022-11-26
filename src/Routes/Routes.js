import { createBrowserRouter } from "react-router-dom";
import Buyers from "../Dashboard/Buyers";
import Dashboard from "../Layouts/Dashboard";
import MyOrders from "../Dashboard/MyOrders";
import Sellers from "../Dashboard/Sellers";
import ErrorElement from "../ErrorElement/ErrorElement";
import Main from "../Layouts/Main";
import AdvertisedProducts from "../Pages/Home/AdvertisedProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import SignUp from "../Pages/SignUp/SignUp";
import AddProducts from "../Dashboard/AddProducts";
import MyProducts from "../Dashboard/MyProducts";
import BrandProducts from "../Pages/BrandProducts/BrandProducts";
import PrivateRoute from "./PrivateRoute";

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
        path: "/advertisedProducts",
        element: <AdvertisedProducts></AdvertisedProducts>,
      },
      {
        path: `/brand/:id`,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_PORT}/brand/${params.id}`),
        element: <BrandProducts></BrandProducts>,
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
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
        path: "/dashboard/addproducts",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/myproducts",
        element: <MyProducts></MyProducts>,
      },
    ],
  },
]);

export default router;
