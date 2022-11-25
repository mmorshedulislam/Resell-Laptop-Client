import React, { useContext } from "react";
import AdvertisedProducts from "./AdvertisedProducts";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import Brands from "./Brands";
import HomeDell from "./HomeDell";
import HomeHp from "./HomeHp";
import HomeWalton from "./HomeWalton";

const Home = () => {
  return (
    <div>
      {/* <BannerCarousel></BannerCarousel> */}
      <Banner></Banner>
      <Brands></Brands>
      {/* <AdvertisedProducts></AdvertisedProducts> */}
      {/* <HomeHp></HomeHp> */}
      {/* <HomeDell></HomeDell> */}
      {/* <HomeWalton></HomeWalton> */}
    </div>
  );
};

export default Home;
