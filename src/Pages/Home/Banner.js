import React from "react";

const Banner = () => {
  return (
    <div className="lg:h-screen">
      <div
        className="hero lg:min-h-screen"
        style={{
          backgroundImage: `url("https://www.hp.com/gb-en/shop/Html/Merch/Images/c07964576_1750x1285.jpg")`,
          backgroundPosition: 'center', 
          backgroundSize: 'contain'
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content flex justify-center items-center">
          <div className="w-full lg:w-2/3 mx-auto">
            <h1 className="mb-5 text-2xl lg:text-5xl font-bold"><span>Welcome,</span> <br /> World Class Brand Reselling Laptop Collection...</h1>
            <p className="mb-5">
            HP Pavilion 14-ec0005na Full-HD Laptop – Ryzen™ 7
            </p>
            <button className="btn btn-accent">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
