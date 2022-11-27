import React, { useContext } from "react";
import AdvertisedProducts from "./Advertised/AdvertisedProducts";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import Brands from "./Brands";

const Home = () => {
  return (
    <div>
      {/* <BannerCarousel></BannerCarousel> */}
      <Banner></Banner>
      <Brands></Brands>
      {/* <AdvertisedProducts></AdvertisedProducts> */}
    </div>
  );
};

export default Home;
