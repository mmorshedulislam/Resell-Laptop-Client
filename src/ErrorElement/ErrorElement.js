import React from "react";
import { Link, useRouteError } from "react-router-dom";
import NavbarHead from "../Shared/NavbarHead";

const ErrorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <NavbarHead></NavbarHead>
      {/* <div className="h-screen flex justify-center items-center text-center">
        <div>
          <h2 className="text-5xl text-center">Something went wrong!</h2>
          <p className="text-2xl">{error.message || error.status} is not Found</p>
        </div>
      </div> */}
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
             {error.status}
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link
              to="/"
              className="bg-blue-500 py-2 px-3 rounded-sm text-white"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorElement;
