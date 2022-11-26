import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useBuyer from "../hooks/useBuyer";
import Loading from "../Shared/Loading";

const BuyerRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isBuyer, buyerLoading, setBuyerLoading] = useBuyer(user?.email);
  console.log(isBuyer);
  const location = useLocation();
  if (buyerLoading) {
    return <Loading></Loading>;
  }

  if (!isBuyer) {
    return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default BuyerRoute;
