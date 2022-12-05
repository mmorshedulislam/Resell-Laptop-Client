import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const {
    data: wishlists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/wishlist?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDelete = (id) => {
    const agree = window.confirm(
      "Are you sure want to Delete the Product from Wishlist?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/mywishlist/${id}`, {
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-5">
        My Wishlist: {wishlists?.length}
      </h2>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Payment
              </th>
              <th scope="col" className="py-3 px-6">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlists.map((wishlist) => (
              <tr
                key={wishlist._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <div className="w-20">
                    <img
                      className="rounded-full w-full"
                      src={wishlist?.image}
                      alt="Product"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 lg:font-semibold text-gray-900 dark:text-white">
                  <p className="">{wishlist?.name}</p>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${wishlist.currentPrice}
                </td>
                <td className="py-4 px-6">
                  <Link
                    to={`/dashboard/payment/${wishlist._id}`}
                    className="btn btn-accent btn-sm"
                  >
                    Please Pay
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDelete(wishlist?._id)}>
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

export default MyWishlist;
