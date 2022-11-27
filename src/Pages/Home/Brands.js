import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/brands`)
      .then((data) => setBrands(data.data));
  }, []);

  return (
    <div className="my-5">
      <h2 className="text-center text-3xl lg:text-5xl font-semibold my-5">
        Choose Your Brand
      </h2>
      <div className="grid grid-cols-3 gap-2 lg:gap-5 mx-3 lg:mx-0">
        {brands &&
          brands.map((brand) => (
            <Link
              to={`/brand/${brand._id}`}
              key={brand._id}
              className="bg-[#D0F4DE] rounded-lg"
            >
              <img src={brand.logo} alt="" />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Brands;
