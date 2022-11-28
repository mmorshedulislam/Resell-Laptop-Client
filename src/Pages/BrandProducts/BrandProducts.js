import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../Shared/BookingModal";
import Loading from "../../Shared/Loading";
import Product from "../Products/Product";

const BrandProducts = () => {
  const brand = useLoaderData();
  const [booking, setBooking] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", brand.brand],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_PORT}/product?brand=${brand.brand}`).then(
        (res) => res.json()
      ),
  });

  const handleBooking = (booking) => {
    setBooking(booking);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-[#f0eded] my-5">
      <div className="mb-5">
        <h2 className="text-5xl py-2 text-center font-bold uppercase">
          {brand.brand}
        </h2>
        <p className="text-center text-xl w-3/4 lg:w-full mx-auto">
          Pick out your Best with World Class Brand...
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-10">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            setBooking={setBooking}
          ></Product>
        ))}
      </div>
      <BookingModal
        booking={booking}
        setBooking={setBooking}
        handleBooking={handleBooking}
      ></BookingModal>
    </div>
  );
};

export default BrandProducts;
