import React, { useContext } from "react";
import AboutUs from "./AboutUs";
import AdvertisedProducts from "./Advertised/AdvertisedProducts";
import Banner from "./Banner";
import Brands from "./Brands";
import ContactUs from "./ContactUs";
import HomeAdvertised from "./HomeAdvertised";
import HomeBlogs from "./HomeBlogs";
import OurServices from "./OurServices";
import Slides from "./Slides";

const Home = () => {
  return (
    <div>
      {/* <Slides></Slides> */}
      <Banner></Banner>
      <Brands></Brands>
      {/* <HomeAdvertised></HomeAdvertised> */}
      <AboutUs></AboutUs>
      <OurServices></OurServices>
      <HomeBlogs></HomeBlogs>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
