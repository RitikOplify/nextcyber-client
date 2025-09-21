"use client";
import { ArrowRight, MailIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return;
    }
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[radial-gradient(69.34%_100%_at_50%_0%,rgba(2,91,207,0.32)_0%,rgba(7,8,10,0.4)_40%)] bg-[#07080A] border-t border-[#2F3031]">
      <div className=" relative flex flex-col items-start pt-20 px-20 pb-0 gap-15 w-full max-w-[1440px] mx-auto text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-5.5">
              <h2 className="text-2xl font-bold tracking-wide">NEXTCYBR</h2>
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Where tech founders hire great developers really fast.
            </p>
            <div className="flex space-x-4">
              <Link
                href=""
                className=" bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A00] p-2 rounded-full "
                aria-label="LinkedIn"
              >
                <BiLogoLinkedin size={24} />
              </Link>
              <Link
                href=""
                className="bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A00] p-2 rounded-full  "
                aria-label="Instagram"
              >
                <BiLogoInstagram size={24} />
              </Link>
              <Link
                href=""
                className="bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A00] p-2 rounded-full  "
                aria-label="Twitter"
              >
                <BiLogoTwitter size={24} />
              </Link>
            </div>
          </div>

          {/* Website Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              WEBSITE
            </h3>
            <ul className="space-y-3">
              {[
                "Freelancer",
                "Candidate",
                "Company",
                "Mentorship",
                "About Us",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href=""
                    className="text-[#9C9C9D] hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms Of Use", "Blogs", "Events"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href=""
                      className="text-[#9C9C9D] hover:text-white transition-colors duration-200 text-sm hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              SIGN UP
            </h3>
            <div className="flex items-center mb-6 text-[#9C9C9D]">
              <MailIcon size={18} />
              <span className="ml-2 text-sm">
                Email us for updates and offer
              </span>
            </div>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full border border-[#1B1C1E] px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#025BCF] focus:border-[#025BCF] transition-colors duration-200 text-sm"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1B1C1E] p-3.5 transition-colors duration-200 group"
                aria-label="Submit email"
              >
                <ArrowRight
                  size={16}
                  className="text-[#6A6B6C] group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] w-full py-6 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#9C9C9D] text-sm mb-4 md:mb-0">
              ©2025 NextCybr. All Rights Reserved.
            </div>
            <div className="flex space-x-5">
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(
                (link) => (
                  <Link
                    key={link}
                    href=""
                    className="text-[#9C9C9D] hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
