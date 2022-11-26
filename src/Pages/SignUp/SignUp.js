import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const { createUser, profileUpdate, googleSignIn } = useContext(AuthContext);

  const { handleSubmit, register, reset } = useForm();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [token] = useToken(userEmail);

  const handleSignUp = (data) => {
    const { name, image, email, password, userType } = data;
    const userImg = image[0];

    const formData = new FormData();
    formData.append("image", userImg);

    const url = `https://api.imgbb.com/1/upload?key=b244a88f9f8d1ed1e003856b185c6459`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imgUrl = imgData.data.url;

          createUser(email, password)
            .then((result) => {
              const user = result.user;
              setUserEmail(user?.email);
              
              profileUpdate(name, imgUrl)
                .then()
                .catch((err) => console.log(err));

              if (user.uid) {
                const userData = {
                  name,
                  image: imgUrl,
                  email,
                  userType,
                };

                fetch(`${process.env.REACT_APP_PORT}/users`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(userData),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    toast.success("User Created Successfully.");
                    reset();
                  });
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };
  if (token) {
    navigate("/");
  }
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="w-full px-5 lg:w-1/2 mx-auto my-10">
      <h2 className="text-3xl mb-5">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="mb-6">
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="name"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="user_avatar"
          >
            Upload Your Photo
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            {...register("image", { required: true })}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>
        <div className="my-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your Email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            {...register("password", { required: true })}
          />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <Link
              to="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </Link>
          </label>
        </div>
        <h4 className="text-xl mb-3">Register as a </h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              id="bordered-radio-1"
              type="radio"
              value="buyer"
              name="user"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked
              {...register("userType")}
            />
            <label
              for="bordered-radio-1"
              className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Buyer
            </label>
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              id="bordered-radio-2"
              type="radio"
              value="seller"
              name="user"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register("userType")}
            />
            <label
              for="bordered-radio-2"
              className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Seller
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="mt-5 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignUp;
