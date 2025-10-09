"use client";
import JobTable from "@/components/Jobs/MyJob";
import instance from "@/utils/axios";
import {
  Bookmark,
  Briefcase,
  BriefcaseBusiness,
  Building,
  Calendar,
  Clock,
  DollarSign,
  File,
  FileSpreadsheet,
  GraduationCap,
  MapPin,
  MapPinHouse,
  Plus,
  Receipt,
  Signature,
  Star,
  User,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

function JobsPage() {
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
  const [activeTab, setActiveTab] = useState("Browse Jobs");
  const [apiJobs, setJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const { data } = await instance.get("/job/get-all-jobs");
      console.log("✅ Jobs fetched successfully:", data);
      setJobs(data.jobPosts); // usually an array of job posts
    } catch (error) {
      console.error(
        "❌ Error fetching jobs:",
        error.response?.data || error.message
      );
      throw error.response?.data || { message: "Failed to fetch jobs" };
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short", // or "long" for full month name
      year: "numeric",
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="relative">
        <div className="flex p-2 border border-g-500 bg-g-700 mx-auto w-fit mb-7.5 gap-1 rounded-full">
          <button
            onClick={() => setActiveTab("Browse Jobs")}
            className={`text-base py-2 px-4 leading-4 font-semibold text-g-200 whitespace-nowrap ${
              activeTab === "Browse Jobs" ? " bg-g-500 rounded-full" : ""
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setActiveTab("My Jobs")}
            className={`text-base py-2 px-4 leading-4 font-semibold text-g-200 whitespace-nowrap ${
              activeTab === "My Jobs" ? " bg-g-500 rounded-full" : ""
            }`}
          >
            My Jobs
          </button>
        </div>
        <Link
          href={"/add-new-job"}
          className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border cursor-pointer absolute right-0 top-0 border-g-500 text-g-200 w-fit"
        >
          <Plus size={20} />
          <span>Post New Job</span>
        </Link>
      </div>

      {activeTab === "Browse Jobs" && (
        <>
          <div className="flex justify-center pb-5 w-full ">
            <div className=" overflow-hidden  whitespace-nowrap">
              <div className="px-5 border border-g-600 bg-g-700 rounded-lg md:w-[480px] mx-auto ">
                <input
                  type="text"
                  placeholder="Search for jobs, companies..."
                  className="py-4 outline-none"
                />
              </div>
              <div className=" pt-5 flex gap-5 overflow-x-auto scrollbar pb-1">
                <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
                  <MapPin size={20} />
                  <span>Location</span>
                </div>
                <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
                  <FileSpreadsheet size={20} />
                  <span>Contract Type</span>
                </div>
                <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
                  <Receipt size={20} />
                  <span>Salary</span>
                </div>
                <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
                  <BriefcaseBusiness size={20} />
                  <span>Experience</span>
                </div>
                <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
                  <GraduationCap size={20} />
                  <span>Skills</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className=" text-sm font-semibold text-g-200 leading-4 pb-2">
            32 Jobs found
          </h3>
          <div className=" flex gap-5">
            <div className=" flex-1 sm:flex-0 flex flex-col gap-5">
              {apiJobs.length > 0 &&
                apiJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-g-600 rounded-[10px] p-5 border border-g-500"
                  >
                    {/* Badges */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-2">
                        <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded bg-light-blue text-primary">
                          <Star size={12} />
                          Featured
                        </span>

                        <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded  bg-light-blue text-primary">
                          <Zap size={12} />
                          Urgent
                        </span>
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
                    <div className="mt-6 mb-2 flex items-center capitalize whitespace-nowrap gap-3 text-g-300 text-xs leading-4">
                      <div className="flex items-center gap-1.5  ">
                        <Clock size={16} />
                        <span>
                          {job.contractType.split("_").join(" ").toLowerCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2  ">
                        <Users size={16} />
                        <span>
                          {job.minExperience}-{job.maxExperience}
                        </span>
                      </div>
                      <div className="flex items-center gap-2  ">
                        <DollarSign size={16} />
                        <span>{job.maxSalary}</span>
                      </div>
                    </div>

                    {/* Posted Date */}
                    <p className="text-g-300 text-xs">
                      Posted on {formatDate(job.createdAt)}
                    </p>

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
              {apiJobs.length > 0 &&
                jobs.map((job) => (
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
                    <div className="mt-6 mb-2 flex items-center whitespace-nowrap gap-3 text-g-300 text-xs leading-4">
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
            <div className=" hidden sm:block bg-g-800 py-10 px-5 flex-1 h-fit rounded-[10px] border border-g-500">
              <div className=" border-b border-dashed border-g-400">
                <div className=" flex items-center gap-3">
                  <Image
                    src={"/image.png"}
                    height={60}
                    width={60}
                    alt="company-logo"
                    className=" rounded-[10px]"
                  />
                  <h4 className=" font-medium text-xl leading-6 underline decoration-dotted underline-offset-[25%] text-g-100">
                    Ernst & Young
                  </h4>
                </div>
                <div>
                  {/* Job Details */}
                  <div className="flex items-center gap-3 text-g-200 font-semibold py-4 text-xs leading-4">
                    <div className="flex items-center gap-1.5  ">
                      <Clock size={16} />
                      <span>{jobs[0].type}</span>
                    </div>
                    <div className="flex items-center gap-2  ">
                      <Users size={16} />
                      <span>{jobs[0].experience}</span>
                    </div>
                    <div className="flex items-center gap-2  ">
                      <Receipt size={16} />
                      <span>{jobs[0].salary}</span>
                    </div>
                    <div className="flex items-center gap-2  ">
                      <Calendar size={16} />
                      <span>Posted on {jobs[0].posted}</span>
                    </div>
                  </div>
                  <h2 className=" text-g-200 leading-6 font-medium text-2xl pb-2.5">
                    Cybersecurity Internship
                  </h2>
                </div>
              </div>
              <div className=" mt-7.5">
                <h5 className=" text-g-200 leading-6 font-medium">
                  Job Description
                </h5>
                <p className=" text-g-300 font-normal leading-6 mt-3">
                  EY exists to build a better working world, helping create
                  long-term value for clients, people and society and build
                  trust in the capital markets. Enabled by data and technology,
                  diverse EY teams in over 150 countries provide trust through
                  assurance and help clients grow, transform and operate.
                </p>
              </div>
              <div className="mt-7.5">
                <h5 className="text-g-200 leading-6 font-medium ">
                  Key Responsibilities
                </h5>
                <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
                  <li>Assist with security monitoring and incident triage.</li>
                  <li>Participate in vulnerability scanning and patching.</li>
                  <li>Help create security awareness materials.</li>
                  <li>Document security procedure and policies.</li>
                </ul>
              </div>
              <div className=" mt-7.5">
                <h5 className=" text-g-200 leading-6 font-medium">
                  Smart Skill Tags
                </h5>
                <div className="flex gap-2 items-center mt-3  text-g-200 text-xs  leading-4 font-medium">
                  <div className="py-1 px-2 bg-g-600 border border-g-500 rounded-full">
                    Security Operations
                  </div>
                  <div className="py-1 px-2 bg-g-600 border border-g-500 rounded-full">
                    GRC
                  </div>
                  <div className="py-1 px-2 bg-g-600 border border-g-500 rounded-full">
                    Incident Response
                  </div>
                </div>
              </div>
              <div className="mt-7.5">
                <h5 className="text-g-200 leading-6 font-medium ">
                  Required Skills
                </h5>
                <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
                  <li>Basic Networking</li>
                  <li>Windows/Linux OS</li>
                  <li>Eagerness to learn</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === "My Jobs" && <JobTable />}
    </div>
  );
}

export default JobsPage;
