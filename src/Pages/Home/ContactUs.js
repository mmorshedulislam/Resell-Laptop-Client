import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-[#023047] py-20 mb-5">
        <h2 className="text-5xl text-center text-white">Contact Us</h2>
      <form className="w-full px-5 lg:w-1/2 mx-auto">
        <div className="my-3">
          <label htmlFor="" className="text-white">Name</label>
          <input type="text" placeholder="Your Name" className="bg-[#C3CCD6] input input-bordered w-full" />
        </div>
        <div className="my-3">
          <label htmlFor="" className="text-white ">Email</label>
          <input type="text" placeholder="Your Email" className="input input-bordered w-full bg-[#C3CCD6]" />
        </div>
        <div className="my-3">
          <label htmlFor="" className="text-white">Subject</label>
          <input type="text" placeholder="Your Subject" className="bg-[#C3CCD6] input input-bordered w-full" />
        </div>
        <div className="my-3">
          <label htmlFor="" className="text-white" >Message</label>
          <textarea className="h-40 w-full textarea textarea-bordered bg-[#C3CCD6]" name="message" id="" placeholder="Your Message" ></textarea>
        </div>
        <input value={'Send'} type="submit" className="py-2 px-3 rounded-md bg-green-500 font-semibold text-white cursor-pointer" />
      </form>
    </div>
  );
};

export default ContactUs;
