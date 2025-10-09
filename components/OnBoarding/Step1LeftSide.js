import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

function Step1LeftSide() {
  return (
    <div className=" h-full w-full flex flex-col justify-between">
      <Image
        src={"/onboarding/top-half-circle-shades.svg"}
        width={304}
        height={304}
        alt="top-half-circle-shades"
        className="mx-auto"
      />
      <div>
        <div className=" flex flex-col items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={32}
                className="fill-dark-yellow text-dark-yellow"
              />
            ))}
          </div>
          <p className=" mt-4 max-w-sm text-2xl text-center leading-8 font-medium text-white">
            Trusted by thousands of job seekers!
          </p>
        </div>
        <div className=" mt-15">

        </div>
      </div>
      <Image
        src={"/onboarding/bottom-half-circle-shades.svg"}
        width={304}
        height={304}
        alt="top-half-circle-shades"
        className="mx-auto"
      />
    </div>
  );
}

export default Step1LeftSide;
