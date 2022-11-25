import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);
  return (
    <div>
      <h2 className="text-center text-5xl font-semibold my-5">
        Choose Your Brand
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {brands.map((brand) => (
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
