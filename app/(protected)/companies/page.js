import { Building, MapPinHouse, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CompaniesPage() {
  return (
    <div className=" max-w-[1440px] mx-auto">
      <h1 className=" text-2xl leading-8 font-semibold text-accent-color-1">
        Browse Companies
      </h1>
      <div className="pt-5 pb-7.5  flex justify-center">
        <div className=" overflow-hidden  whitespace-nowrap">
          <div className="px-5 border border-g-600 bg-g-700 rounded-lg md:w-[480px] mx-auto ">
            <input
              type="text"
              placeholder="Search for jobs, companies..."
              className="py-4 outline-none"
            />
          </div>
          <div className=" pt-5 flex gap-5 overflow-x-auto scrollbar pb-1 ">
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <MapPinHouse size={20} />
              <span>Location</span>
            </div>
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <User size={20} />
              <span>Company Size</span>
            </div>
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <Building size={20} />
              <span>Location</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Link
            href={`/companies/${i}`}
            key={i}
            className=" bg-g-600 p-4 rounded-[10px]"
          >
            <div className=" flex gap-2 items-center">
              <Image
                src={"/image.png"}
                height={32}
                width={32}
                alt="company-logo"
              />
              <span className=" font-semibold text-sm leading-[150%]">
                Google Inc.
              </span>
            </div>
            <div className="mt-3 bg-g-700 rounded-lg h-25 text-sm leading-4 font-medium"></div>
            <div className=" mt-4 mb-5 text-g-200 space-y-2">
              <p>Texas, USA</p>
              <p>5000+ employees</p>
            </div>
            <button className=" px-6 py-3 w-full border border-g-500 text-g-200 leading-6 text-base font-medium rounded-lg">
              1252 Open Jobs
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CompaniesPage;
