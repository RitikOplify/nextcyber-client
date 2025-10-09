import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

function Step1LeftSide() {
  const team = [
    {
      name: "Alex Smith",
      role: "Security Engineer",
      img: "/avatar.jpeg",
      bg: "bg-[#FDD6D6]",
    },
    {
      name: "Shai Hope",
      role: "Security Engineer",
      img: "/avatar.jpeg",
      bg: "bg-[#FCEFCB]",
    },
    {
      name: "Nathan Astle",
      role: "Security Engineer",
      img: "/avatar.jpeg",
      bg: "bg-[#E8F1F9]",
    },
  ];
  return (
    <div className=" h-full w-full flex flex-col justify-between">
      <Image
        src={"/onboarding/top-half-circle-shades.svg"}
        width={304}
        height={304}
        alt="top-half-circle-shades"
        className="mx-auto"
      />
      <div className=" overflow-x-hidden ">
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

        <div className="space-y-5 mt-15">
          {/* Row 1 - Scroll Left */}
          <div className="scroll-left hide-scrollbar">
            {[...team, ...team].map((member, i) => (
              <div
                key={`row1-${i}`}
                className="flex items-center gap-5 bg-g-600 p-3 rounded-[10px] w-fit pr-10"
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center ${member.bg}`}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div>
                  <div className="inline-block bg-[#03C3EC4D] text-dark-blue text-[10px] font-semibold leading-3.5 px-2 py-1 rounded mb-1">
                    {member.role}
                  </div>
                  <h3 className="text-g-100 text-sm leading-5 font-semibold">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Scroll Right */}
          <div className="scroll-right hide-scrollbar">
            {[...team, ...team].map((member, i) => (
              <div
                key={`row2-${i}`}
                className="flex items-center gap-5 bg-g-600 p-3 rounded-[10px] w-fit pr-10"
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center ${member.bg}`}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div>
                  <div className="inline-block bg-[#03C3EC4D] text-dark-blue text-[10px] font-semibold leading-3.5 px-2 py-1 rounded mb-1">
                    {member.role}
                  </div>
                  <h3 className="text-g-100 text-sm leading-5 font-semibold">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
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
