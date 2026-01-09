"use client";

import JobCard from "@/components/cards/JobCard";
import JobFilter from "@/components/filters/JobFilter";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import JobApplyModel from "@/components/modal/JobApply";
import JobDetailsModal from "@/components/modal/JobDetailsModal";
import AdvancePagination from "@/components/ui/AdvancePagination";
import Search from "@/components/ui/Search";
import { asyncGetAppliedJob, asyncGetJobs } from "@/store/actions/jobActions";
import { removeJobs } from "@/store/slices/jobSlice";
import { Loader2, SlidersHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JobsPage() {
  const [activeTab, setActiveTab] = useState("Browse Jobs");
  const [jobOpen, setJobOpen] = useState(false);
  const [jobId, setJobId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const { appliedJob } = useSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [locationSearch, setLocationSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    contractType: "TEMPORARY",
    remotePolicy: "onsite",
    skills: [],
    salaryRange: [],
    experienceRange: { min: 0, max: 10 },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const buildParams = useCallback(() => {
    const params = {
      page,
      ...Object.fromEntries(
        Object.entries({
          search: debounceSearchTerm, // Use debounced search term
          location: locationSearch,
        }).filter(([_, value]) => value !== "")
      ),
    };
    return params;
  }, [page, debounceSearchTerm, locationSearch]);

  const fetchJobs = useCallback(() => {
    const params = buildParams();
    if (debounceSearchTerm || locationSearch) {
      setLoading(true);
      dispatch(asyncGetJobs(params)).then(() => setLoading(false));
    }

    if (!debounceSearchTerm && !locationSearch) {
      setLoading(true);
      if (jobs?.length === 0)
        dispatch(asyncGetJobs("")).then(() => setLoading(false));
      else setLoading(false);
    }
  }, [buildParams, dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (user.role == "STUDENT" && appliedJob == 0)
      dispatch(asyncGetAppliedJob());
  }, []);

  const applyJob = async (id) => {
    setJobId(id);
    setJobOpen(true);
  };
  const truncateChars = (text, limit = 10) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const handleSearch = () => {
    // Implement search logic here
  };

  const clearOnUnmount = () => {
    dispatch(removeJobs());
  };

  return (
    <>
      <div className="mx-auto max-h-[calc(100vh-100.6px)] overflow-auto">
        <>
          <div className="sticky top-0 z-60 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-2/5">
              <Search
                value={searchTerm}
                setValue={setSearchTerm}
                placeholder="Search jobs..."
                className="w-full!"
                clearOnUnmount={clearOnUnmount}
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
              <button
                onClick={handleSearch}
                className="bg-primary rounded-lg px-8 py-3.5 text-gray-300 cursor-pointer"
              >
                Search
              </button>
              <button
                onClick={handleToggleFilter}
                className="flex items-center gap-2 bg-g-600 rounded-lg px-12 py-3.5 text-gray-300 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-155.6px)] overflow-hidden">
            {loading ? (
              <div className="flex mt-5 justify-center items-center col-span-full py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                <div className="flex gap-5 mt-5 overflow-hidden">
                  <div
                    className={`overflow-y-auto max-h-[calc(100vh-321px)]  md:max-h-[calc(100vh-195px)] overflow-hidden mx-auto hide-scrollbar ${
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
                      {jobs?.length > 0 ? (
                        jobs?.map((job, i) => {
                          return (
                            <JobCard
                              key={i}
                              job={job}
                              handleClick={(job) => setSelectedJob(job)}
                            />
                          );
                        })
                      ) : (
                        <div className="flex justify-center items-center w-full h-[15vh] col-span-3">
                          <p className="text-gray-500">No jobs found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedJob && (
                    <div className="mx-auto absolute z-50 w-[calc(100%-40px)] md:static md:block md:w-[67.1%]">
                      <JobDetailsModal
                        selectedJob={selectedJob}
                        onClose={() => setSelectedJob(null)}
                        applyJob={applyJob}
                      />
                    </div>
                  )}
                </div>
                {jobs?.length > 0 && (
                  <div className="sticky z-60 bottom-0 flex justify-center mt-5">
                    <AdvancePagination
                      currentPage={page}
                      totalPages={Math.ceil(jobs?.length / 10)}
                      onPageChange={(newPage) => setPage(newPage)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      </div>

      <JobApplyModel
        id={jobId}
        isOpen={jobOpen}
        onClose={() => {
          setJobOpen(false);
          setJobId(null);
        }}
      />
      {isFilterOpen && (
        <JobFilter
          isOpen={isFilterOpen}
          filterData={filterData}
          setFilterData={setFilterData}
          onClose={() => setIsFilterOpen(false)}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default JobsPage;
