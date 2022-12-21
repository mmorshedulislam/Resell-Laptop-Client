import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProjectLoading from "../../Shared/ProjectLoading";
import Blog from "./Blog";

const Blogs = () => {
  const blogs = useLoaderData();
  return (
    <div className="py-20 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
