"use client";
import { getCompanyProfileApi } from "@/api/companyApi";
import JobApplyModel from "@/components/modal/JobApply";
import { asyncGetAppliedJob } from "@/store/actions/jobActions";
import {
  Bookmark,
  Clock,
  DollarSign,
  Globe,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

function CompanyDetailPage({ params }) {
  const { id } = use(params);
  const dispatch = useDispatch();
  const [company, setCompany] = useState(null);
  const [jobOpen, setJobOpen] = useState(false);
  const [jobId, setJobId] = useState(null);
  const { appliedJob } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user.role == "STUDENT" && appliedJob == 0)
      dispatch(asyncGetAppliedJob());
  }, []);

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

  const getCompany = async () => {
    try {
      const { data } = await getCompanyProfileApi(id);
      console.log(data.company);
      setCompany(data.company);
    } catch (error) {
      console.log(error);
    }
  };
  const applyJob = async (id) => {
    setJobId(id);
    setJobOpen(true);
  };

  useEffect(() => {
    getCompany();
  }, []);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className=" rounded-lg overflow-hidden">
        <div className="relative w-full h-[200px]">
          <Image
            src="/company-banner.jpg"
            alt="company-banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute  z-10 -bottom-12.5 pl-5">
            <Image
              src={company?.profilePicture?.url || "/company-logo.jpg"}
              height={100}
              width={100}
              alt="company-logo"
              className="rounded-[10px]"
            />
          </div>
        </div>

        <div className="bg-g-600 p-5 relative">
          <div className=" mt-17.5">
            <h2 className=" text-2xl leading-8 font-semibold text-g-100">
              {company?.companyName}
            </h2>
            <p className=" leading-6 text-g-200 my-2">{company?.headquarter}</p>
            <div className=" flex items-center gap-20">
              <div className=" flex gap-2 items-center text-g-200">
                <Users size={20} />
                <span>5000+</span>
              </div>
              {company?.companyWebsiteLink && (
                <div className=" flex gap-2 items-center text-g-200">
                  <Globe size={20} />
                  <span>{company?.companyWebsiteLink}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5 p-5 bg-g-600 rounded-lg">
        <h2 className=" text-lg leading-[100%] font-semibold text-g-200">
          Overview
        </h2>
        <p className=" mt-2.5 text-base leading-6 text-g-300">
          EY exists to build a better working world, helping create long-term
          value for clients, people and society and build trust in the capital
          markets. Enabled by data and technology, diverse EY teams in over 150
          countries provide trust through assurance and help clients grow,
          transform and operate. Working across assurance, consulting, law,
          strategy, tax and transactions, EY teams ask better questions to find
          new answers for the complex issues facing our world today. Find out
          more about the EY global network http://ey.com/en_gl/legal-statement
        </p>
      </div>
      <div className=" mt-10">
        <h3 className=" font-semibold text-lg leading-[100%] text-g-200">
          Latest Job Posted
        </h3>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {company?.jobs &&
              company.jobs.map((job) => (
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
                  <div className="mt-6 mb-2 flex items-center gap-3 text-g-300 text-xs leading-4">
                    <div className="flex items-center gap-1.5  ">
                      <Clock size={16} />
                      <span className=" capitalize">
                        {job.contractType.split("_").join(" ").toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2  ">
                      <Users size={16} />
                      <span>
                        {`${job?.minWorkExperience}-${job?.maxWorkExperience} Years`}
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
                  <div className="flex items-center justify-between mt-10">
                    <button
                      disabled={appliedJob.some(
                        (applied) => applied.job.id === job.id
                      )}
                      onClick={() => {
                        applyJob(job.id);
                      }}
                      className=" text-g-200 px-4 py-2 w-full disabled:cursor-no-drop cursor-pointer rounded-lg text-sm font-medium transition-colors duration-200 border border-g-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className=" text-center">
        <button className=" text-g-200 leading-6 text-base font-medium bg-g-600 border border-g-500 px-6 py-3 mt-10 rounded-full">
          View more jobs
        </button>
      </div>
      <JobApplyModel
        id={jobId}
        isOpen={jobOpen}
        onClose={() => {
          setJobOpen(false);
          setJobId(null);
        }}
      />
    </>
  );
}

export default CompanyDetailPage;
