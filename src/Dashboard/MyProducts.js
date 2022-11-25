import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_PORT}/myproduct?email=${user?.email}`
      ).then((res) => res.json()),
  });

  const handleStatus = (id) => {
    const agree = window.confirm(
      "Are you sure want to The Product Available to Sold?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/myproduct/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully status changed");
          }
        });
    }
  };

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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="p-4 w-32">
                  <img src={product.image} alt={product.name} />
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.name} <br />
                  <span className="uppercase">Brand: {product.brand}</span>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${product?.price}
                </td>
                <td class=" py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-center">
                      {product.status === "sold" ? "Sold" : "Available"}
                    </span>
                    <div onClick={() => handleStatus(product._id)}>
                      {product.status === "sold" ? (
                        <button className="btn btn-xs mt-1">Available</button>
                      ) : (
                        <button className="btn btn-xs mt-1">Sold</button>
                      )}
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  <button className="btn btn-xs">Add To</button>
                </td>
                <td class="py-4 px-6">
                  <button class="btn btn-xs font-medium text-red-600 dark:text-red-500 hover:underline">
                    Remove
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
