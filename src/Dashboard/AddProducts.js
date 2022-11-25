import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const date = new Date();
  const publishedDate = format(date, "PP");


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
      price,
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
            price,
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
            publishedDate
          };

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
              }
            });
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl text-center">Add Products</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Product Price"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
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
          <div>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              {...register("image", { required: true })}
            />
          </div>
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
        </div>

        <div className="w-full px-5">
          <textarea
            className="textarea textarea-bordered w-full h-28"
            placeholder="Product Description"
            {...register("description", { required: true })}
          ></textarea>
          {
            <button
              type="submit"
              class="w-full  mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          }
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
