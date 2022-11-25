import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../Products/Product";

const BrandProducts = () => {
  const brand = useLoaderData();
  const { data: products = [] } = useQuery({
    queryKey: ["products", brand.brand],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/product?brand=${brand.brand}`).then(
        (res) => res.json()
      ),
  });

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-5xl py-2 text-center font-bold uppercase">{brand.brand}</h2>
        <p className="text-center text-xl">
          Pick out your Best with World Class Brand...
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-10">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default BrandProducts;
