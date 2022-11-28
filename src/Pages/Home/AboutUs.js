import React from "react";

const AboutUs = () => {
  return (
    <div className="py-20 px-5 bg-[#f8f5f5] text-[#112A46] mb-5">
      <h2 className="text-3xl font-bold lg:text-5xl text-center ">About Us</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
        <div className="">
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-5">
            We provide Second hand Laptop collection with World Class Brand.
          </h2>
          <p className="text-xl text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut adipisci
            deleniti debitis, velit nemo quasi ullam saepe voluptatibus. Illo
            omnis dolores facilis saepe dignissimos, quod ipsam ut eveniet!
            Sequi, iste. deleniti debitis, velit nemo quasi ullam saepe
            voluptatibus. Illo omnis dolores facilis saepe dignissimos, quod
            ipsam ut eveniet! Sequi, iste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
