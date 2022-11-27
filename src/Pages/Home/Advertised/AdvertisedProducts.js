import React from "react";
import { useLoaderData } from "react-router-dom";
import AdsProduct from "./AdsProduct";

const AdvertisedProducts = () => {
  const products = useLoaderData();
  return (
    <>
      <div className="bg-[#edede9] pt-16 rounded-md mt-5">
        <div>
          <h2 className="text-center text-5xl pb-5">
            Trending Boost Products...{" "}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-10">
          {products.map((product) => (
            <AdsProduct key={product._id} product={product}></AdsProduct>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdvertisedProducts;
