import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useSeller from "../hooks/useSeller";
import Loading from "../Shared/Loading";

const SellerRoutes = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isSeller, sellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (sellerLoading) {
    return <Loading></Loading>;
  }

  if (!isSeller) {
    return (
      <Navigate to={"/dashboard"} state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default SellerRoutes;
