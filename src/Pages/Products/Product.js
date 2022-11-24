import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="w-full bg-[#264653] text-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link href="#">
        <img
          className="p-8 rounded-t-lg"
          src="https://flowbite.com/docs/images/products/apple-watch.png"
          alt="product"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link href="#">
          <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          {[...Array(5).keys()].map((star) => (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-white dark:text-white">
            $599
          </span>
          <Link
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
