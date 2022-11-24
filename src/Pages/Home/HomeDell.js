import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../Products/Product';

const HomeDell = () => {
    return (
        <>
      <div className="mt-5 pt-16 rounded-md">
      <div className="mb-5">
          <h2 className="text-5xl py-2 text-center font-bold">Dell</h2>
          <p className="text-center text-xl">
            Pick out your Best with World Class Brand...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-10">
          {[...Array(3).keys()].map((p) => (
            <Product></Product>
          ))}
        </div>
        <div className='pb-10 w-40 mx-auto'>
        <Link
            to="/products"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See All
          </Link>
        </div>
      </div>
    </>
    );
};

export default HomeDell;