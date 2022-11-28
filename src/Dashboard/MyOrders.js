import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/bookings?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-5">My Orders: {orders?.length}</h2>

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
                Payment
              </th>
              <th scope="col" class="py-3 px-6">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="p-4">
                  <div className="w-20">
                    <img
                      className="rounded-full w-full"
                      src={order?.image}
                      alt="Product"
                    />
                  </div>
                </td>
                <td class="py-4 px-6 lg:font-semibold text-gray-900 dark:text-white">
                  <p className="">{order?.productName}</p>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${order.price}
                </td>
                <td class="py-4 px-6">
                  <Link
                    to={`/dashboard/payment/${order._id}`}
                    class="btn btn-accent btn-sm"
                  >
                    Pay
                  </Link>
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

export default MyOrders;
