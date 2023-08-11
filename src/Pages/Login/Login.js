import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { signInEmailPassword, googleSignIn, forgotPassword } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();

  const { register, handleSubmit, reset } = useForm();
  const [token] = useToken(userEmail);

  const handleLogin = (data) => {
    console.log("clicked");
    setProcessing(true);
    const { email, password } = data;
    signInEmailPassword(email, password)
      .then((result) => {
        const user = result.user;
        setUserEmail(user?.email);
        reset();
        setLoginError("");
        setProcessing(false);
      })
      .catch((err) => {
        setLoginError(err.message || err.code);
        setProcessing(false);
      });
  };

  // GOOGLE SIGNIN
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user?.displayName,
          image: user.photoURL,
          email: user?.email,
          userType: "buyer",
        };

        if (user?.uid) {
          setUserEmail(user?.email);
          fetch(`${process.env.REACT_APP_PORT}/googleuser/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("Successfully Login with Google.");
              reset();
            });
        }
      })
      .catch((err) => console.log(err));
  };

  // Forgotten password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (email) {
      forgotPassword(email)
        .then(() => {
          setForgotMessage("");
          toast.success("Password Reset Email Sent.");
        })
        .catch((err) => {
          setForgotMessage(err.message || err.code);
        });
    } else {
      toast.error("Email is Required.");
    }
  };

  if (token) {
    navigate("/", { replace: true });
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        <div className="flex justify-center items-center">
          <div className="w-full px-5 lg:w-full lg:mx-auto my-10">
            <h2 className="text-3xl mb-5">Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                  autoFocus
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Your Email"
                  {...register("email", { required: true })}
                  // ref={emailRef}
                />
                {forgotMessage && (
                  <span className="text-red-400">
                    Your Email is invalid. Please try a valid email.
                  </span>
                )}
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
              <p className="text-red-400 mb-2">{loginError}</p>
              <button
                type="submit"
                className={`text-white w-full bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 ${
                  processing && "bg-blue-400"
                }`}
                disabled={processing}
              >
                Login
              </button>
            </form>
            <div className="flex justify-between">
              <div className="flex items-start my-6">
                <label
                  for="terms"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <button>
                    You don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-700">
                      Sign Up
                    </Link>
                  </button>
                </label>
              </div>
              <div className="flex items-start my-6">
                <label
                  for="terms"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <button
                    onClick={handleForgotPassword}
                    className="text-blue-700"
                  >
                    Forgotten Password?
                  </button>
                </label>
              </div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 "
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
        </div>
        <div className="order-first p-5 flex justify-center items-center">
          <img
            className="w-full"
            src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
