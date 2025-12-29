"use client";
import JobTable from "@/components/Jobs/MyJob";
import JobApplyModel from "@/components/Modal/JobApply";
import { asyncGetAppliedJob, asyncGetJobs } from "@/store/actions/jobActions";
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
import { useDispatch, useSelector } from "react-redux";

function JobsPage() {
  const [activeTab, setActiveTab] = useState("Browse Jobs");
  const [jobOpen, setJobOpen] = useState(false);
  const [jobId, setJobId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const dispatch = useDispatch();
  const { appliedJob } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (jobs.length == 0) dispatch(asyncGetJobs());
  }, []);

  useEffect(() => {
    if (user.role == "STUDENT" && appliedJob == 0)
      dispatch(asyncGetAppliedJob());
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const applyJob = async (id) => {
    setJobId(id);
    setJobOpen(true);
  };

  return (
    <>
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
          {user.role == "COMPANY" && (
            <Link
              href={"/add-new-job"}
              className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border cursor-pointer absolute right-0 top-0 border-g-500 text-g-200 w-fit"
            >
              <Plus size={20} />
              <span>Post New Job</span>
            </Link>
          )}
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
              {jobs.length} Jobs found
            </h3>
            <div className=" flex gap-5">
              <div className=" flex-1 sm:flex-0 flex flex-col gap-5">
                {jobs.length > 0 &&
                  jobs.map((job) => {
                    return (
                      <div
                        key={job.id}
                        className="bg-g-600 rounded-[10px] p-5 border border-g-500"
                        onClick={() => {
                          setSelectedJob(job);
                        }}
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
                              {job.contractType
                                .split("_")
                                .join(" ")
                                .toLowerCase()}
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
                        <div className="flex items-center justify-between mt-11 pt-5.5 border-t border-g-500">
                          <div className="flex items-center gap-2 text-[#9C9C9D]">
                            {/* Google Logo Placeholder */}
                            <FcGoogle />
                            Google
                          </div>
                          <button
                            title="Apply Job"
                            disabled={appliedJob.some(
                              (applied) => applied.job.id === job.id
                            )}
                            className=" text-g-200 px-4 cursor-pointer disabled:cursor-no-drop py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-g-500"
                            onClick={() => {
                              applyJob(job.id);
                            }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {selectedJob && (
                <div className=" hidden sm:block bg-g-800 sticky top-0 py-10 px-5 flex-1 h-fit rounded-[10px] border border-g-500">
                  <div className=" border-b border-dashed border-g-400">
                    <div className=" flex items-center gap-3">
                      <Image
                        src={
                          selectedJob?.company?.profilePicture?.url || "/image.png"
                        }
                        height={60}
                        width={60}
                        alt="company-logo"
                        className=" rounded-[10px] h-15 w-15 object-cover"
                      />
                      <h4 className=" font-medium text-xl leading-6 underline decoration-dotted underline-offset-[25%] text-g-100">
                        {selectedJob?.company?.companyName}
                      </h4>
                    </div>
                    <div>
                      {/* Job Details */}
                      <div className="flex items-center gap-3 text-g-200 font-semibold py-4 text-xs leading-4">
                        <div className="flex items-center gap-1.5  ">
                          <Clock size={16} />
                          <span className=" capitalize">
                            {selectedJob?.contractType.toLowerCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2  ">
                          <Users size={16} />
                          <span>
                            {
                              <span>
                                {`${selectedJob?.minWorkExperience}-${selectedJob?.maxWorkExperience} Years`}
                              </span>
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2  ">
                          <Receipt size={16} />
                          <span>{selectedJob?.maxSalary}</span>
                        </div>
                        <div className="flex items-center gap-2  ">
                          <Calendar size={16} />
                          <span>
                            Posted on {formatDate(selectedJob?.createdAt)}
                          </span>
                        </div>
                      </div>
                      <h2 className=" text-g-200 leading-6 font-medium text-2xl pb-2.5">
                        {selectedJob?.title}
                      </h2>
                    </div>
                  </div>
                  <div className=" mt-7.5">
                    <h5 className=" text-g-200 leading-6 font-medium">
                      Job Description
                    </h5>
                    <p className=" text-g-300 font-normal leading-6 mt-3">
                      {selectedJob?.jobDescription}
                    </p>
                  </div>
                  <div className="mt-7.5">
                    <h5 className="text-g-200 leading-6 font-medium ">
                      Key Responsibilities
                    </h5>
                    <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
                      <li>
                        Assist with security monitoring and incident triage.
                      </li>
                      <li>
                        Participate in vulnerability scanning and patching.
                      </li>
                      <li>Help create security awareness materials.</li>
                      <li>Document security procedure and policies.</li>
                    </ul>
                  </div>
                  <div className=" mt-7.5">
                    <h5 className=" text-g-200 leading-6 font-medium">
                      Certifications
                    </h5>
                    <div className="flex gap-2 items-center mt-3  text-g-200 text-xs  leading-4 font-medium">
                      {selectedJob?.certifications &&
                        selectedJob.certifications.map((certification, i) => (
                          <div
                            key={i}
                            className="py-1 px-2 bg-g-600 border border-g-500 rounded-full"
                          >
                            {certification}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-7.5">
                    <h5 className="text-g-200 leading-6 font-medium ">
                      Required Skills
                    </h5>
                    <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
                      {selectedJob?.skills &&
                        selectedJob.skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {activeTab === "My Jobs" && <JobTable />}
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

export default JobsPage;
