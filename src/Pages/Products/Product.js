import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Product = ({ product, setBooking }) => {
  const { user } = useContext(AuthContext);
  const buyerEmail = user?.email;

  const handleAddToWishList = (product) => {
    const productId = product._id;
    delete product._id;
    const wishProduct = { ...product, productId, buyerEmail };

    fetch(`${process.env.REACT_APP_PORT}/wishlist`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Successfully added to Wishlist. Please complete the order.')
        }
       });
  };

  return (
    <>
      {product?.status === "available" && (
        <div className="w-full bg-[#264653] text-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
          <Link href="#">
            <img
              className="rounded-t-lg w-full h-72"
              src={product?.image}
              alt={product?.name}
            />
          </Link>
          <div className="p-5">
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
            <div className="flex items-end justify-between my-5">
              <div className="flex flex-col">
                <del className="text-xl text-white dark:text-white stroke-black">
                  ${product?.originalPrice}
                </del>
                <span className="text-3xl font-bold text-white dark:text-white">
                  ${product?.currentPrice}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAddToWishList(product)}
                  className="w-10 text-w-400 cursor-pointer"
                >
                  <img
                    title="Add to Wishlist"
                    className="w-full"
                    src="https://cdn-icons-png.flaticon.com/512/4689/4689880.png"
                    alt=""
                  />
                </button>
                <label
                  title="Place Order"
                  onClick={() => setBooking(product)}
                  htmlFor="booking-modal"
                  // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <img
                    className="w-10 cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png"
                    alt=""
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
