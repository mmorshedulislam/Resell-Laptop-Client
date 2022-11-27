import React from "react";

const Blog = ({blog}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={blog.img} alt="" />
      <div className="p-5">

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {blog.description.slice(0, 250)}...
        </p>
      </div>
    </div>
  );
};

export default Blog;
