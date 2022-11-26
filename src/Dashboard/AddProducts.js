import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const date = new Date();
  const publishedDate = format(date, "PP");
  const [loading, setLoading] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["user", user],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/user?email=${user?.email}`).then(
        (res) => res.json()
      ),
  });

  const handleAddProduct = (productData) => {
    const {
      name,
      originalPrice,
      currentPrice,
      condition,
      purchaseYear,
      phone,
      location,
      brand,
      description,
    } = productData;

    const image = productData.image[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(
      `https://api.imgbb.com/1/upload?key=b244a88f9f8d1ed1e003856b185c6459`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.data) {
          const product = {
            name,
            originalPrice,
            currentPrice,
            condition,
            purchaseYear,
            phone,
            location,
            image: imgData.data.url,
            brand,
            description,
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            sellerVerified: userData?.verified,
            publishedDate,
            status: "available",
          };
          setLoading(true)
          fetch(`${process.env.REACT_APP_PORT}/addproducts`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                navigate("/dashboard/myproducts");
                toast.success("Product Added successfully.");
                reset()
                setLoading(false);
              }
            });
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl lg:text-5xl text-center my-5">Add Products</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          <select
            className="select select-bordered w-full"
            {...register("brand", { required: true })}
          >
            <option disabled selected>
              Brand
            </option>
            <option value={"hp"}>HP</option>
            <option value={"dell"}>Dell</option>
            <option value={"walton"}>Walton</option>
          </select>
          <input
            type="text"
            placeholder="Original Price"
            className="input input-bordered w-full"
            {...register("originalPrice", { required: true })}
          />
          <input
            type="text"
            placeholder="Current Price"
            className="input input-bordered w-full"
            {...register("currentPrice", { required: true })}
          />
          <select
            className="select select-bordered w-full"
            {...register("condition", { required: true })}
          >
            <option disabled selected>
              Product Condition?
            </option>
            <option value={"Excellent"}>Excellent</option>
            <option value={"Good"}>Good</option>
            <option value={"Fair"}>Fair</option>
          </select>
          <input
            type="text"
            placeholder="Year of Purchase? Example: 1Y 2M"
            className="input input-bordered w-full"
            {...register("purchaseYear", { required: true })}
          />
          <input
            type="number"
            placeholder="Seller Phone Number"
            className="input input-bordered w-full"
            {...register("phone", { required: true })}
          />
          <input
            type="text"
            placeholder="Meeting Location"
            className="input input-bordered w-full"
            {...register("location", { required: true })}
          />
        </div>

        <div className="w-full px-5">
          <div>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              {...register("image", { required: true })}
            />
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-28 mt-5"
            placeholder="Product Description"
            {...register("description", { required: true })}
          ></textarea>
          {loading ? (
            <button
              disabled
              type="button"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-center">Processing...</span>
            </button>
          ) : (
            <button
              type="submit"
              class="w-full  mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
