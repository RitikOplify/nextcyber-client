import Link from "next/link";
import React from "react";

function Section1() {
  return (
    <div className=" bg-g-900 h-[calc(100vh-73.33px)]">
      <div className=" flex items-center justify-center flex-col pt-35">
        <h2 className=" text-sm leading-5 tracking-[4%] font-semibold">
          TRUSTED BY THOUSANDS OF JOB SEEKERS!
        </h2>
        <div className="flex justify-center items-center space-x-[-12px] mt-5">
          <img
            src="/avatar.jpeg"
            alt="User 1"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />
          <img
            src="/user-profile.png"
            alt="User 2"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />
          <img
            src="/avatar.jpeg"
            alt="User 1"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />
          <img
            src="/user-profile.png"
            alt="User 2"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />{" "}
          <img
            src="/avatar.jpeg"
            alt="User 1"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />
          <img
            src="/user-profile.png"
            alt="User 2"
            className="w-13 h-13 rounded-full border-2 border-[#F7F7F7] object-cover"
          />
        </div>
        <h3 className=" text-accent-color-1 text-5xl leading-14 tracking-[-2%] font-semibold text-center mt-8">
          AI Powered Resumes <br />
          that lands you dream job
        </h3>
        <Link
          href={"/auth"}
          className=" bg-primary text-white text-xl leading-6 font-medium py-4 px-8 rounded-lg mt-12"
        >
          Sign me up!
        </Link>
      </div>
    </div>
  );
}

export default Section1;
