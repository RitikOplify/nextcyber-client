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
      <div className="">
        <div>
          <Star size={32} fill="#D9A61C" />
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
