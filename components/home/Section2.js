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
import Image from "next/image";

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
    <div className="bg-g-900 py-20">
      <div className="overflow-hidden px-5 sm:px-10">
        <div className="text-center mb-11">
          <h2 className="text-4xl leading-11 font-medium text-accent-color-1">
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
          <h1 className="text-4xl leading-11 font-medium text-g-200 mb-5">
            Browse Thousands of{" "}
            <span className="text-accent-color-1">Cybersecurity</span>
            <br />
            <span className="text-accent-color-1">Jobs Daily</span>, Connect on
            Your Terms
          </h1>
          <p className="text-g-300 body max-w-lg mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mi
            lectus, pharetra sit amet elit in, condimentum rutrum ante.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-15 pb-30">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-g-600 rounded-[10px] p-5 border border-g-500"
            >
              {/* Badges */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  {job.featured && (
                    <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded bg-light-blue text-primary">
                      <Star size={12} />
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded  bg-light-blue text-primary">
                      <Zap size={12} />
                      Urgent
                    </span>
                  )}
                </div>
                <div className="bg-g-500 p-1.5 rounded">
                  <Bookmark size={16} className=" text-g-300" />
                </div>
              </div>

              {/* Job Title */}
              <h3 className="text-sm leading-4 font-semibold text-g-200">
                {job.title}
              </h3>
              <p className="text-[#9C9C9D] text-sm">{job.location}</p>

              {/* Job Details */}
              <div className="mt-6 mb-2 flex items-center gap-3 text-g-600 text-xs leading-4">
                <div className="flex items-center gap-1.5  ">
                  <Clock size={16} />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2  ">
                  <Users size={16} />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2  ">
                  <DollarSign size={16} />
                  <span>{job.salary}</span>
                </div>
              </div>

              {/* Posted Date */}
              <p className="text-g-300 text-xs">Posted on {job.posted}</p>

              {/* Company and Apply Button */}
              <div className="flex items-center justify-between mt-11 pt-5.5 border-t border-g-500">
                <div className="flex items-center gap-2 text-[#9C9C9D]">
                  {/* Google Logo Placeholder */}
                  <FcGoogle />
                  Google
                </div>
                <button className=" text-g-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-g-500">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className=" pt-10">
          <h2 className="text-accent-color-1 text-center font-medium text-4xl leading-11 tracking-[-1%] pb-5">
            Stop Guessing. Start Growing.
          </h2>
          <p className=" text-base leading-6 font-medium text-center max-w-lg mx-auto text-g-300">
            Your career deserves more than a standard CV. With{" "}
            <span className=" text-accent-color-1">NextGen CV</span>, AI
            transforms your profile into a living, evolving career map
          </p>
          <div className=" pt-17.5 grid grid-cols-4 gap-5">
            <div className=" flex flex-col items-center justify-center text-center">
              <Image
                src={"/build-once-grow-forever.png"}
                height={140}
                width={160}
                alt="build-once-grow-forever"
                className="pb-7.5"
              />
              <h4 className=" text-g-200 font-semibold text-base leading-6 ">
                Build once, grow forever
              </h4>
              <p className=" text-g-300 text-sm leading-5 mt-2.5">
                AI auto-updates your CV as you add skills, certifications, and
                experience.
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center text-center">
              <Image
                src={"/personalized-roadmap.png"}
                height={140}
                width={160}
                alt="personalized-roadmap"
                className="pb-7.5"
              />
              <h4 className=" text-g-200 font-semibold text-base leading-6 ">
                Personalized roadmap
              </h4>
              <p className=" text-g-300 text-sm leading-5 mt-2.5">
                AI auto-updates your CV as you add skills, certifications, and
                experience.
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center text-center">
              <Image
                src={"/showcase-your-wins.png"}
                height={140}
                width={160}
                alt="showcase-your-wins"
                className="pb-7.5"
              />
              <h4 className=" text-g-200 font-semibold text-base leading-6 ">
                Showcase your wins
              </h4>
              <p className=" text-g-300 text-sm leading-5 mt-2.5">
                AI auto-updates your CV as you add skills, certifications, and
                experience.
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center text-center">
              <Image
                src={"/land-faster.png"}
                height={140}
                width={160}
                alt="land-faster"
                className="pb-7.5"
              />
              <h4 className=" text-g-200 font-semibold text-base leading-6 ">
                Land faster
              </h4>
              <p className=" text-g-300 text-sm leading-5 mt-2.5">
                AI auto-updates your CV as you add skills, certifications, and
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CybersecurityJobBoard;
