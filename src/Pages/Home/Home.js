import React, { useContext } from "react";
import AdvertisedProducts from "./AdvertisedProducts";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import HomeDell from "./HomeDell";
import HomeHp from "./HomeHp";
import HomeWalton from "./HomeWalton";

const Home = () => {
  return (
    <div>
      {/* <BannerCarousel></BannerCarousel> */}
      <Banner></Banner>
      <AdvertisedProducts></AdvertisedProducts>
      <HomeHp></HomeHp>
      <HomeDell></HomeDell>
      <HomeWalton></HomeWalton>
    </div>
  );
};

export default Home;
