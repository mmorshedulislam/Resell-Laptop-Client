import React from "react";
import Product from "./Product";

const Products = () => {
  return (
    <>
      <div>
        <p className="text-center text-xl">Pick out your Best</p>
        <h2 className="text-5xl pb-5 text-center font-bold">
          Your all Dreams Laptop Here...
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-10 px-5 py-10">
        {[...Array(6).keys()].map((p) => (
          <Product></Product>
        ))}
      </div>
    </>
  );
};

export default Products;
