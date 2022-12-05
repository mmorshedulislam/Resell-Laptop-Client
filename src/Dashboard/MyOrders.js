import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/bookings?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDelete = (id) => {
    const agree = window.confirm("Are you sure want to Delete the Order?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/myorders/${id}`, {
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

  console.log(orders);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-5">My Orders: {orders?.length}</h2>

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
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <div className="w-20">
                    <img
                      className="rounded-full w-full"
                      src={order?.image || order?.productImage}
                      alt="Product"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 lg:font-semibold text-gray-900 dark:text-white">
                  <p className="">{order?.productName}</p>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${order.price}
                </td>
                <td className="py-4 px-6">
                  {order?.paid ? (
                    <span className="text-green-500 text-xl">Paid</span>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${order._id}`}
                      className="py-2 px-3 bg-green-500 text-white btn-sm rounded-md"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDelete(order?._id)}>
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
