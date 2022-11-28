import { createBrowserRouter } from "react-router-dom";
import Buyers from "../Dashboard/Buyers";
import Dashboard from "../Layouts/Dashboard";
import MyOrders from "../Dashboard/MyOrders";
import Sellers from "../Dashboard/Sellers";
import ErrorElement from "../ErrorElement/ErrorElement";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import SignUp from "../Pages/SignUp/SignUp";
import AddProducts from "../Dashboard/AddProducts";
import MyProducts from "../Dashboard/MyProducts";
import BrandProducts from "../Pages/BrandProducts/BrandProducts";
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import SellerRoutes from "./SellerRoutes";
import AdminRoute from "./AdminRoute";
import MyBuyers from "../Dashboard/MyBuyers";
import AdvertisedProducts from "../Pages/Home/Advertised/AdvertisedProducts";
import Blog from "../Pages/Blogs/Blog";
import Blogs from "../Pages/Blogs/Blogs";
import Payment from "../Pages/Payment/Payment";

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
        loader: () => fetch(`${process.env.REACT_APP_PORT}/adsproduct`),
        element: <AdvertisedProducts></AdvertisedProducts>,
      },
      {
        path: `/brand/:id`,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_PORT}/brand/${params.id}`),
        element: (
          <PrivateRoute>
            <BrandProducts></BrandProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        loader: () => fetch(`${process.env.REACT_APP_PORT}/blogs`),
        element: <Blogs></Blogs>,
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
        element: (
          <AdminRoute>
            <Buyers></Buyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/sellers",
        element: (
          <AdminRoute>
            <Sellers></Sellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoutes>
            <AddProducts></AddProducts>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoutes>
            <MyProducts></MyProducts>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoutes>
            <MyBuyers></MyBuyers>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
