import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Buyers = () => {
  const { user, userDelete } = useContext(AuthContext);
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_PORT}/users?userType=buyer&email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json()),
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
        Buyers: {buyers?.length}
      </h2>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                Profile
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr
                key={buyer._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      buyer?.image
                        ? buyer?.image
                        : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    }
                    alt={buyer?.name}
                  />
                </th>
                <th>
                  <div className="pl-3">
                    <div className="text-base font-semibold">{buyer?.name}</div>
                  </div>
                </th>
                <td className="py-4 px-6">{buyer?.email}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDelete(buyer._id)}>
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

export default Buyers;
