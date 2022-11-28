import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyBuyers = () => {
  const { user, userDelete } = useContext(AuthContext);
  const { data: myBuyers = [], refetch } = useQuery({
    queryKey: ["myBuyers"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/mybuyers/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handleUserDelete = (user) => {
    userDelete(user)
      .then((res) => res.json())
      .then((data) => {
        if (data.uid) {
          toast.success("User deleted successfully.");
        }
      });
  };

  const handleDelete = (id) => {
    const agree = window.confirm("Are you sure want to Delete the Buyer?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/user/${id}`, {
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

  return (
    <div>
      <h2 className="text-3xl lg:text-5xl text-center my-5">
        My Buyers: {myBuyers?.length}
      </h2>

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div class="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Profile
              </th>
              <th scope="col" class="py-3 px-6">
                Name
              </th>
              <th scope="col" class="py-3 px-6">
                Email
              </th>
              <th scope="col" class="py-3 px-6">
                Phone
              </th>
              <th scope="col" class="py-3 px-6">
                Location
              </th>
              <th scope="col" class="py-3 px-6">
                Ordered Product
              </th>
            </tr>
          </thead>
          <tbody>
            {myBuyers.map((buyer) => (
              <tr
                key={buyer._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    src={
                      buyer?.buyerImg
                        ? buyer?.buyerImg
                        : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    }
                    alt={buyer?.buyerName}
                  />
                </th>
                <th>
                  <div class="pl-3">
                    <div class="text-base font-semibold">
                      {buyer?.buyerName}
                    </div>
                  </div>
                </th>
                <td class="py-4 px-6">{buyer?.buyerEmail}</td>
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    {buyer?.phone}
                  </div>
                </td>
                <td class="py-4 px-6">{buyer.location}</td>
                <td class="py-4 px-6">{buyer.productName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
