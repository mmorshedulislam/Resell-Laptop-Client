import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { json } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_PORT}/myproduct?email=${user?.email}`
      ).then((res) => res.json()),
  });

  const handleStatusSold = (id) => {
    const agree = window.confirm(
      "Are you sure want to The Product Available to Sold?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/productsold/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully status changed");
            refetch();
          }
        });
    }
  };

  const handleStatusAvailable = (id) => {
    const agree = window.confirm(
      "Are you sure want to The Product Available to Sold?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/productavailable/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully status changed");
            refetch();
          }
        });
    }
  };

  const handleDelete = (id) => {
    const agree = window.confirm("Want to Delete The Product?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/myproduct/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
          }
        });
    }
  };

  const handleAdsProduct = (product) => {
    const adProduct = {
      _id: product._id,
      name: product.name,
      phone: product.phone
    };

    const agree = window.confirm("Boost the Product?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/v2/adsproduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(adProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-5">
        My Products: {products?.length}
      </h2>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="py-3 px-6">
                Product
              </th>
              <th scope="col" class="py-3 px-6">
                Price
              </th>
              <th scope="col" class="py-3 px-6">
                Status
              </th>
              <th scope="col" class="py-3 px-6">
                Advertised
              </th>
              <th scope="col" class="py-3 px-6">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="p-4 w-32">
                  <img
                    className="rounded-full w-20"
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.name} <br />
                  <span className="uppercase">Brand: {product.brand}</span>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${product?.currentPrice}
                </td>
                <td class=" py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-center">
                      {product.status === "sold" ? "Sold" : "Available"}
                    </span>
                    <div>
                      {product.status === "sold" ? (
                        <button
                          onClick={() => handleStatusAvailable(product._id)}
                          className="btn btn-xs mt-1"
                        >
                          Available
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusSold(product._id)}
                          className="btn btn-xs mt-1"
                        >
                          Sold
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.ads ? (
                    <span className="">Boosted</span>
                  ) : (
                    <button
                      onClick={() => handleAdsProduct(product)}
                      className={`py-1 px-2 bg-green-500 text-white rounded-md`}
                      disabled={product.ads}
                    >
                      Ads
                    </button>
                  )}
                </td>
                <td class="py-4 px-6">
                  <button>
                    <SlClose className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
