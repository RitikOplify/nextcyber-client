import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className=" sticky top-0 left-0 flex w-full mx-auto bg-g-800 items-center justify-between px-5 sm:px-10 lg:px-20 py-3 z-30">
      <Link href={"/"}>
        <Image
          src="/logo.png"
          className=" h-5 sm:h-9 w-auto"
          height={72}
          width={329}
          alt="nextcybr-logo"
        />
      </Link>

      <div className="items-center space-x-8 text-g-200 text-sm font-semibold hidden lg:flex">
        <div className="flex items-center space-x-2 cursor-pointer ">
          <span>For Recruiter</span>
          <ChevronDown size={20} />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>For Candidates</span>
          <ChevronDown size={20} />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>Blogs</span>
          <ChevronDown size={20} />
        </div>
      </div>

      <div className="flex items-center space-x-4 text-white text-xs sm:text-base font-medium">
        <Link
          href={"/auth"}
          className=" px-4 py-2 sm:px-6 sm:py-3 bg-g-600 border border-g-500 rounded-full"
        >
          Login
        </Link>
        <Link
          href={"/auth"}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-primary rounded-full "
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
