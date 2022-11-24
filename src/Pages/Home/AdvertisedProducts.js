import React from "react";
import Product from "../Products/Product";

const AdvertisedProducts = () => {
  return (
    <>
      <div className="bg-[#edede9] pt-16 rounded-md">
        <div>
          <h2 className="text-center text-5xl pb-5">Trending Products...</h2>
        </div>
        <div className="grid grid-cols-3 gap-10 px-5 pb-20">
          {[...Array(3).keys()].map((p) => (
            <Product></Product>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdvertisedProducts;
