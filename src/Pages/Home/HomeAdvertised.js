import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdsProduct from "./Advertised/AdsProduct";

const HomeAdvertised = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PORT}/products`).then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <>
      <div className="bg-[#f0fff0] pt-16 rounded-md my-5">
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

export default HomeAdvertised;
