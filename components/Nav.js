import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0C0D0F] to-[#111214] flex items-center justify-between px-20 py-3 z-30">
      <div className="flex items-center justify-center">
        <div className="text-xl font-bold tracking-wider text-white">
          NEXTCYBR
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-sm font-semibold text-[#9C9C9D]">
            For Recruiter
          </span>
          <ChevronDown className="w-5 h-5 text-[#9C9C9D]" />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer text-[#9C9C9D]">
          <span className="text-sm font-semibold ">For Candidates</span>
          <ChevronDown className="w-5 h-5" />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer text-[#9C9C9D]">
          <span className="text-sm font-semibold">Blogs</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          href={"/auth"}
          className="px-6 py-3 text-white bg-[#1B1C1E] border border-[#2F3031] rounded-full text-sm font-medium"
        >
          Login
        </Link>
        <Link
          href={"/auth"}
          className="px-6 py-3 text-white bg-[#025BCF] rounded-full text-sm font-medium"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
