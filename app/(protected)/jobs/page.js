"use client";

import JobCard from "@/components/cards/JobCard";
import JobFilter from "@/components/filters/JobFilter";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import JobApplyModel from "@/components/modal/JobApply";
import JobDetailsModal from "@/components/modal/JobDetailsModal";
import AdvancePagination from "@/components/ui/AdvancePagination";
import Search from "@/components/ui/Search";
import useDidChange from "@/hooks/useDidChange";
import { asyncGetJobs } from "@/store/actions/jobActions";
import { removeJobs } from "@/store/slices/jobSlice";
import { Loader2, SlidersHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function JobsPage() {
  const [jobOpen, setJobOpen] = useState(false);
  const [jobId, setJobId] = useState(null);
  const { jobs, currentJobPage } = useSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(currentJobPage || 1);
  const [locationSearch, setLocationSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    contractType: "",
    remotePolicy: "",
    skills: [],
    salaryRange: [],
    experienceRange: { min: 0, max: 10 },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const clearOnUnmount = () => {
    dispatch(removeJobs());
    return true;
  };

  const buildParams = useCallback(() => {
    const params = {
      page,
      ...Object.fromEntries(
        Object.entries({
          location: locationSearch || "",
          Search: searchTerm,
          contractType: filterData.contractType,
          remotePolicy: filterData.remotePolicy,
        }).filter(([_, value]) => value !== ""),
      ),
    };
    return params;
  }, [page, searchTerm, locationSearch, filterData]);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    dispatch(asyncGetJobs(buildParams(), setLoading)).then(() =>
      setLoading(false),
    );
  }, [buildParams]);

  useEffect(() => {
    console.log("Jobs updated:", jobs.length);
    if (jobs?.length === 0) fetchJobs();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchJobs();
  };

  const applyJob = (id) => {
    setJobId(id);
    setJobOpen(true);
  };

  const handleClearSearch = () => {
    setLoading(true);
    setSearchTerm("");
    dispatch(asyncGetJobs()).then(() => setLoading(false));
  };

  const isFilterApplied = () => {
    return (
      filterData.contractType ||
      filterData.remotePolicy ||
      (filterData.skills && filterData.skills.length > 0) ||
      (filterData.salaryRange && filterData.salaryRange.length > 0) ||
      (filterData.experienceRange &&
        (filterData.experienceRange.min > 0 ||
          filterData.experienceRange.max < 10))
    );
  };

  useDidChange(page,() => {
    fetchJobs();
  });

  return (
    <>
      <div className="mx-auto max-h-[calc(100vh-100.6px)] overflow-auto">
        <>
          <div className="sticky top-0 z-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-2/5">
              <Search
                value={searchTerm}
                setValue={setSearchTerm}
                placeholder="Search jobs..."
                className="w-full!"
                clearOnUnmount={clearOnUnmount}
                handleClear={handleClearSearch}
              />
            </div>

            <div className="relative w-full md:w-2/5">
              <LocationSearchInput
                selectedPlace={locationSearch}
                onPlaceSelected={(locationData) =>
                  setLocationSearch(
                    locationData.city && locationData.state
                      ? `${locationData?.city}, ${locationData?.state}, ${locationData?.country}`
                      : "",
                  )
                }
                clearOnUnmount={clearOnUnmount}
                handleClear={handleClearSearch}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className="bg-primary rounded-lg px-8 py-3.5 text-gray-300 cursor-pointer"
              >
                Search
              </button>
              {isFilterApplied() ? (
                <button
                  onClick={handleToggleFilter}
                  className="bg-primary/90 rounded-lg px-4 py-3.5 text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <span className="truncate">Filters Applied</span>
                </button>
              ) : (
                <button
                  onClick={handleToggleFilter}
                  className="flex items-center gap-2 bg-g-600 rounded-lg px-12 py-3.5 text-gray-300 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </button>
              )}
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
                    <div className="mx-auto absolute  w-[calc(100%-40px)] md:static md:block md:w-[67.1%]">
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
