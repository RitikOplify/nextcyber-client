"use client";

import JobCard from "@/components/cards/JobCard";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import JobTable from "@/components/jobs/MyJob";
import JobApplyModel from "@/components/modal/JobApply";
import JobDetailsModal from "@/components/modal/JobDetailsModal";
import { asyncGetAppliedJob, asyncGetJobs } from "@/store/actions/jobActions";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JobsPage() {
  const [activeTab, setActiveTab] = useState("Browse Jobs");
  const [jobOpen, setJobOpen] = useState(false);
  const [jobId, setJobId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(jobs?.[0]);
  const dispatch = useDispatch();
  const { appliedJob } = useSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const handleToggleFilter = () => {};

  useEffect(() => {
    if (jobs?.length == 0) dispatch(asyncGetJobs());
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
  const truncateChars = (text, limit = 10) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <>
      <div className="mx-auto max-h-[calc(100vh-100.6px)] overflow-auto">
        {activeTab === "Browse Jobs" && (
          <>
            <div className="sticky top-0 z-10 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-2/5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for jobs, skills..."
                  className="w-full rounded-lg py-3.5 pl-12 pr-4 bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative w-full md:w-2/5">
                <LocationSearchInput
                  selectedPlace={locationSearch}
                  onPlaceSelected={(locationData) =>
                    setLocationSearch(
                      `${locationData.city}, ${locationData.state}, ${locationData.country}`
                    )
                  }
                />
              </div>

              <div className="flex gap-3">
                <button className="bg-primary rounded-lg px-8 py-3.5 text-gray-300">
                  Search
                </button>
                <button
                  onClick={handleToggleFilter}
                  className="flex items-center gap-2 bg-g-600 rounded-lg px-12 py-3.5 text-gray-300"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="flex gap-5 mt-5">
              <div
                className={`overflow-y-auto max-h-[calc(100vh-321px)]  md:max-h-[calc(100vh-175px)] overflow-hidden mx-auto hide-scrollbar ${
                  selectedJob ? "w-full md:w-[32.9%]" : " w-full"
                }`}
              >
                <div
                  className={`grid-cols-1 ${
                    selectedJob
                      ? "grid-cols-1"
                      : "sm:grid-cols-2 md:grid-cols-3"
                  } grid gap-5`}
                >
                  {jobs?.length > 0 &&
                    jobs?.map((job, i) => {
                      return (
                        <JobCard
                          key={i}
                          job={job}
                          onClick={(job) => setSelectedJob(job)}
                        />
                      );
                    })}
                </div>
              </div>
              {selectedJob && (
                <div className="mx-auto absolute z-50 w-[calc(100%-40px)] md:static md:block md:w-[67.1%]">
                  <JobDetailsModal
                    selectedJob={selectedJob}
                    onClose={() => setSelectedJob(null)}
                  />
                </div>
              )}
            </div>
          </>
        )}
        {activeTab === "My Jobs" && (
          <div className="flex justify-end relative">
            <div className="flex p-2 border border-g-500 bg-g-700  w-fit mb-7.5 gap-1 rounded-full">
              <button
                onClick={() => setActiveTab("Browse Jobs")}
                className={`text-base py-2 px-4 leading-4 font-semibold text-g-200 whitespace-nowrap cursor-pointer
                 ${
                   activeTab === "Browse Jobs" ? " bg-g-500 rounded-full" : ""
                 }`}
              >
                Browse Jobs
              </button>
              <button
                onClick={() => setActiveTab("My Jobs")}
                className={`text-base py-2 px-4 leading-4 font-semibold text-g-200 whitespace-nowrap cursor-pointer ${
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
