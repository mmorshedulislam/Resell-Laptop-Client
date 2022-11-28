import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "../Blogs/Blog";

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PORT}/blogs3`).then((data) => {
      setBlogs(data.data);
    });
  }, []);
  return (
    <div className="py-20 px-10">
        <h2 className="text-5xl text-center mb-5">Our Blogs</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default HomeBlogs;
