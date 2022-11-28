import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import {RiSecurePaymentFill} from 'react-icons/ri'
import {MdConnectWithoutContact, MdLocalShipping} from 'react-icons/md'

const OurServices = () => {
  return (
    <div className="py-20 mb-5 bg-[#2f4f4f] text-white">
      <h2 className="text-5xl text-center">Our Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 my-10 ">
        <div className="flex justify-center items-center flex-col mx-auto">
          <p className="block text-7xl w-2/4 mx-auto">
            <MdLocalShipping />
          </p>
          <p className="text-xl">Free Shipping</p>
        </div>
        <div className="flex justify-center items-center flex-col mx-auto">
          <p className="block text-7xl w-2/4 mx-auto">
            <RiSecurePaymentFill />
          </p>
          <p className="text-xl">100% Genuine Product</p>
        </div>
        <div className="flex justify-center items-center flex-col mx-auto">
          <p className="block text-7xl w-2/4 mx-auto">
            <FaMoneyBillWave />
          </p>
          <p className="text-xl">Money Back Guarantee</p>
        </div>
        <div className="flex justify-center items-center flex-col mx-auto">
          <p className="block text-7xl w-2/4 mx-auto">
            <MdConnectWithoutContact />
          </p>
          <p className="text-xl">Quick Response</p>
        </div>
    
      </div>
    </div>
  );
};

export default OurServices;
