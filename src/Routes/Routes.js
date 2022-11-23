import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../ErrorElement/ErrorElement";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";

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
    ],
  },
]);

export default router; 
