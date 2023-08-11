import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdConnectWithoutContact, MdLocalShipping } from "react-icons/md";

const OurServices = () => {
  return (
    <div className="py-20 mb-5 bg-[#2f4f4f] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl text-center font-bold">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10">
          <div className="flex justify-center items-center flex-col w-full mx-auto my-3">
            <p className="flex justify-center items-center text-7xl w-full mx-auto">
              <MdLocalShipping />
            </p>
            <p className="text-xl text-center">Free Shipping</p>
          </div>
          <div className="flex justify-center items-center flex-col w-full mx-auto my-3">
            <p className="flex justify-center items-center text-7xl w-full mx-auto">
              <RiSecurePaymentFill />
            </p>
            <p className="text-xl text-center">100% Genuine Product</p>
          </div>
          <div className="flex justify-center items-center flex-col w-full mx-auto my-3">
            <p className="flex justify-center items-center text-7xl w-full mx-auto">
              <FaMoneyBillWave />
            </p>
            <p className="text-xl text-center">Money Back Guarantee</p>
          </div>
          <div className="flex justify-center items-center flex-col w-full mx-auto my-3">
            <p className="flex justify-center items-center text-7xl w-full mx-auto">
              <MdConnectWithoutContact />
            </p>
            <p className="text-xl text-center">Quick Response</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
