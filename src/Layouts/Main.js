import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavbarHead from "../Shared/NavbarHead";

const Main = () => {
  return (
    <div>
      <NavbarHead></NavbarHead>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
