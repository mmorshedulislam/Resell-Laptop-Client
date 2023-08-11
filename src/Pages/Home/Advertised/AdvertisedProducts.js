import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import BookingModal from "../../../Shared/BookingModal";
import ProjectLoading from "../../../Shared/ProjectLoading";
import AdsProduct from "./AdsProduct";

const AdvertisedProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_PORT}/products`).then((data) => {
      setProducts(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ProjectLoading />;
  }

  return (
    <>
      <div className="bg-[#f0eded] pt-16 rounded-md mt-5">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-center text-3xl lg:text-5xl pb-5 uppercase">
              Advertised Products: {products?.length}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-10">
            {products.map((product) => (
              <AdsProduct
                key={product._id}
                product={product}
                setBooking={setBooking}
              ></AdsProduct>
            ))}
          </div>
          {booking && (
            <BookingModal
              booking={booking}
              setBooking={setBooking}
            ></BookingModal>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvertisedProducts;
