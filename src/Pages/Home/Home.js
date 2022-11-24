import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import AdvertisedProducts from "./AdvertisedProducts";
import Banner from "./Banner";
import HomeDell from "./HomeDell";
import HomeHp from "./HomeHp";
import HomeWalton from "./HomeWalton";

const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Banner></Banner>
      <AdvertisedProducts></AdvertisedProducts>
      <HomeHp></HomeHp>
      <HomeDell></HomeDell>
      <HomeWalton></HomeWalton>
    </div>
  );
};

export default Home;
