"use client";

import React from "react";
import {
  Clock,
  DollarSign,
  MapPin,
  Users,
  Star,
  Zap,
  Briefcase,
  Bookmark,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const CybersecurityJobBoard = () => {
  const companies = [
    "/polarwise.png",
    "/amiri.png",
    "/ciele.png",
    "/larq.png",
    "/y-combinator.svg",
    "/greenhouse.svg",
  ];

  // Job data
  const jobs = [
    {
      id: 1,
      title: "Safety & Security Engineer",
      company: "Google",
      location: "Texas, USA",
      salary: "$130K",
      experience: "3-5 Years",
      type: "Fulltime",
      posted: "May 01, 2023",
      featured: true,
      urgent: true,
    },
    {
      id: 2,
      title: "Safety & Security Engineer",
      company: "Google",
      location: "Texas, USA",
      salary: "$130K",
      experience: "3-5 Years",
      type: "Fulltime",
      posted: "May 01, 2023",
      featured: true,
      urgent: true,
    },
    {
      id: 3,
      title: "Safety & Security Engineer",
      company: "Google",
      location: "Texas, USA",
      salary: "$130K",
      experience: "3-5 Years",
      type: "Fulltime",
      posted: "May 01, 2023",
      featured: true,
      urgent: true,
    },
    {
      id: 4,
      title: "Safety & Security Engineer",
      company: "Google",
      location: "Texas, USA",
      salary: "$130K",
      experience: "3-5 Years",
      type: "Fulltime",
      posted: "May 01, 2023",
      featured: true,
      urgent: true,
    },
  ];

  return (
    <div className="bg-black pt-20 text-white ">
      <div className="overflow-hidden px-5 sm:px-10">
        <div className="text-center mb-11">
          <h2 className="text-xl text-[#69EDFE] font-medium">
            Trusted by Startups and Agencies
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex w-full items-center justify-center gap-10">
            {companies.map((company, index) => (
              <div key={`second-${index}`}>
                <img
                  src={company}
                  className=" h-20 w-35 object-contain"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-40  px-5 sm:px-10">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#9C9C9D] mb-5 leading-tight">
            Browse Thousands of{" "}
            <span className="text-[#69EDFE]">Cybersecurity</span>
            <br />
            <span className="text-[#69EDFE]">Jobs Daily</span>, Connect on Your
            Terms
          </h1>
          <p className="text-[#6A6B6C] text-base max-w-lg mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mi
            lectus, pharetra sit amet elit in, condimentum rutrum ante.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-15 pb-30">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#1B1C1E] rounded-[10px] p-5 border border-[#2F3031]"
            >
              {/* Badges */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  {job.featured && (
                    <span className="inline-flex items-center gap-1.5 p-1 rounded text-xs bg-[#DBF9FF] text-[#025BCF]">
                      <Star size={12} />
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="inline-flex items-center gap-1.5 p-1 rounded text-xs bg-[#DBF9FF] text-[#025BCF]">
                      <Zap size={12} />
                      Urgent
                    </span>
                  )}
                </div>
                <div className="bg-[#2F3031] p-1.5 rounded">
                  <Bookmark size={16} className=" text-[#6A6B6C]" />
                </div>
              </div>

              {/* Job Title */}
              <h3 className="text-base font-medium text-[#9C9C9D]">
                {job.title}
              </h3>
              <p className="text-[#9C9C9D] text-sm">{job.location}</p>

              {/* Job Details */}
              <div className="mt-6 mb-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-[#6A6B6C]">
                  <Clock size={16} />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6A6B6C]">
                  <Users size={16} />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6A6B6C]">
                  <DollarSign size={16} />
                  <span>{job.salary}</span>
                </div>
              </div>

              {/* Posted Date */}
              <p className="text-[#6A6B6C] text-xs">Posted on {job.posted}</p>

              {/* Company and Apply Button */}
              <div className="flex items-center justify-between mt-11 pt-5.5 border-t border-[#2F3031]">
                <div className="flex items-center gap-2 text-[#9C9C9D]">
                  {/* Google Logo Placeholder */}
                  <FcGoogle />
                  Google
                </div>
                <button className=" text-[#9C9C9D] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-[#2F3031]">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CybersecurityJobBoard;
