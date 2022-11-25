import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Product = ({ product, setBooking }) => {
  return (
    <>
      {product?.status === "available" && (
        <div className="w-full bg-[#264653] text-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Link href="#">
            <img
              className="p-8 rounded-t-lg"
              src={product?.image}
              alt={product?.name}
            />
          </Link>
          <div className="px-5 pb-5">
            <Link href="#">
              <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white">
                {product?.name}
              </h5>
            </Link>
            <div className="flex justify-between my-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {product?.sellerName}
                </span>
                {product?.sellerVerified && (
                  <FaCheckCircle
                    title="Verified Seller"
                    className="text-[#2C96FF]"
                  />
                )}
              </div>
              <p>{product?.publishedDate}</p>
            </div>
            <div className="flex justify-between my-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  Brand: <span className="uppercase">{product?.brand}</span>{" "}
                </span>
              </div>
              <p>Condition: {product?.condition}</p>
            </div>
            <div className="flex justify-between my-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  Location: {product?.location}
                </span>
              </div>
              <p>Used: {product?.purchaseYear}</p>
            </div>
            <p>{product?.description.slice(0, 120)}...</p>
            <div className="flex items-center justify-between my-5">
              <div className="flex flex-col">
                <del className="text-xl text-white dark:text-white stroke-black">
                  ${product?.originalPrice}
                </del>
                <span className="text-3xl font-bold text-white dark:text-white">
                  ${product?.currentPrice}
                </span>
              </div>
              <label
                onClick={() => setBooking(product)}
                htmlFor="booking-modal"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Book Now
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
