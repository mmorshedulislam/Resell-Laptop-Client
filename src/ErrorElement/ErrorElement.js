import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <h2 className="text-5xl text-center">Something went wrong!</h2>
      <p className="text-2xl">{error.message || error.status}</p>
    </div>
  );
};

export default ErrorElement;
