"use client";
import React, { useState } from "react";

const NextCyberLanding = () => {
  const [activeTab, setActiveTab] = useState("Recruiter");

  return (
    <div className="w-full bg-black text-white relative overflow-hidden">
      <div className="flex flex-col items-center pt-18 relative z-10 px-5 sm:px-10 max-w-[1440px] mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-3xl font-bold">
            <span className="text-[#69EDFE]">
              The World&apos;s ⚡ Leading Platform
            </span>
            <br />
            <span className="text-[#69EDFE]">for Cyber Professionals</span>
          </h1>
        </div>

        <div className="w-full max-w-2xl   relative">
          <div className="absolute top-1/2 -left-1/10 w-52 h-64 transform -translate-y-1/2 -translate-x-1/2 -rotate-6 -z-1">
            <div className="w-full h-full bg-[#2A2D32] rounded-2xl opacity-80"></div>
          </div>

          <div className="absolute top-1/2 -right-1/10 w-52 h-64 transform -translate-y-1/2 translate-x-1/2 rotate-6 -z-1">
            <div className="w-full h-full bg-[#2A2D32] rounded-2xl opacity-80"></div>
          </div>

          <div className="p-10 z-10 bg-gradient-to-b from-[#07080A] via-[#1B1C1E] to-[#07080A] rounded-[40px]">
            <div className="flex items-center justify-start space-x-4 mb-7">
              <button
                onClick={() => setActiveTab("Recruiter")}
                className={`px-4 py-2 rounded-full text-base font-medium transition ${
                  activeTab === "Recruiter"
                    ? "bg-[#025BCF] text-white"
                    : "bg-transparent text-[#9C9C9D] border border-[#2F3031]"
                }`}
              >
                Recruiter
              </button>
              <button
                onClick={() => setActiveTab("Candidates")}
                className={`px-4 py-2 rounded-full text-base font-medium transition ${
                  activeTab === "Candidates"
                    ? "bg-[#025BCF] text-white"
                    : "bg-transparent text-[#9C9C9D] border border-[#2F3031]"
                }`}
              >
                Candidates
              </button>
            </div>

            <div className="mb-7 text-start">
              <p className="text-xl leading-relaxed font-normal text-[#9C9C9D]">
                <span className="underline decoration-[#69EDFE] text-white decoration-2">
                  Hire
                </span>{" "}
                top remote developers
                <br />
                <span className="underline decoration-[#69EDFE] text-white decoration-2">
                  faster and smarter
                </span>{" "}
                with the world&apos;s first
                <br />
                <span className="underline decoration-[#69EDFE] text-white  decoration-2">
                  AI recruiter
                </span>{" "}
                built to find
                <br />
                elite global engineering talent.
              </p>
            </div>

            <button className="w-full py-4 px-8 bg-gradient-to-b from-[#69EDFE] to-[#025BCF] rounded-full text-white text-xl font-semibold hover:opacity-90 transition-all duration-300">
              Create your profile
            </button>
          </div>
        </div>
      </div>
      <div className=" max-w-[1440px] mx-auto">
        <img src="/landing-page-shades.svg" alt="" />
      </div>
    </div>
  );
};

export default NextCyberLanding;
