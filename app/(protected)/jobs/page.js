"use client";

import JobCard from "@/components/cards/JobCard";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
// import JobCard from "@/components/cards/JobCard";
// import JobFilter from "@/components/filters/JobFilter";
// import LocationSearchInput from "@/components/helper/LocationSearchInput";
// import JobDetailsModal from "@/components/modal/JobDetailsModal";
// import AdvancePagination from "@/components/ui/AdvancePagination";
// import { asyncGetAppliedJob, asyncGetJobs } from "@/store/actions/jobActions";
// import { Loader2, Search, SlidersHorizontal } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const JobsPage = () => {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showMobileModal, setShowMobileModal] = useState(false);

//   const isSplitView = !!selectedJob; // true when a job is selected

//   const { user } = useSelector((state) => state.auth);
//   const { jobs } = useSelector((state) => state.jobs);
//   const { appliedJob } = useSelector((state) => state.jobs);

//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationSearch, setLocationSearch] = useState("");
//   const [filterData, setFilterData] = useState({
//     location: "",
//     experience: "",
//     skills: [],
//     salaryRange: [0, 0],
//     contractType: "",
//     remotePolicy: "",
//     experienceRange: { min: 0, max: 10 },
//   });
//   const [showFilter, setShowFilter] = useState(false);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (jobs?.length === 0) {
//       dispatch(asyncGetJobs()).then(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [dispatch, jobs?.length]);

//   useEffect(() => {
//     if (user?.role === "STUDENT" && appliedJob == null) {
//       dispatch(asyncGetAppliedJob());
//     }
//   }, [dispatch, user?.role, appliedJob]);

//   const handleToggleFilter = () => setShowFilter(!showFilter);

//   const handleJobClick = (job) => {
//     setSelectedJob(job);
//     setShowMobileModal(true); // for mobile
//   };

//   const closeDetails = () => {
//     setSelectedJob(null);
//     setShowMobileModal(false);
//   };

//   return (
//     <>
//       <div className="h-[calc(100vh-100.6px)] grid grid-rows-[auto_1fr_auto] overflow-hidden">
//         {/* Search Bar */}
//         <div className="sticky top-0 z-10 flex flex-col md:flex-row gap-4 items-center">
//           <div className="relative w-full md:w-2/5">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search for jobs, skills..."
//               className="w-full rounded-lg py-3.5 pl-12 pr-4 bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C]"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="relative w-full md:w-2/5">
//             <LocationSearchInput
//               selectedPlace={locationSearch}
//               onPlaceSelected={(locationData) =>
//                 setLocationSearch(
//                   `${locationData.city}, ${locationData.state}, ${locationData.country}`
//                 )
//               }
//             />
//           </div>

//           <div className="flex gap-3">
//             <button className="bg-primary rounded-lg px-8 py-3.5 text-gray-300">
//               Search
//             </button>
//             <button
//               onClick={handleToggleFilter}
//               className="flex items-center gap-2 bg-g-600 rounded-lg px-12 py-3.5 text-gray-300"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               Filter
//             </button>
//           </div>
//         </div>

//         {/* Main Content: Dynamic Grid */}
//         <div className="overflow-y-auto">
//           <div
//             className={`
//               grid gap-5 mt-5
//               ${
//                 isSplitView
//                   ? "grid-cols-1 md:grid-cols-4"
//                   : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
//               }
//             `}
//           >
//             {/* Job Cards Column - Takes 1 column when split */}
//             <div
//               className={`
//                 ${isSplitView ? "md:col-span-1" : "md:col-span-full"}
//                 overflow-y-auto
//               `}
//             >
//               <div
//                 className={`grid ${
//                   isSplitView ? "grid-cols-1" : "grid-cols-4"
//                 } gap-5`}
//               >
//                 {loading ? (
//                   <div className="flex justify-center items-center py-20">
//                     <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//                   </div>
//                 ) : jobs.length > 0 ? (
//                   jobs.map((job, i) => (
//                     <JobCard
//                       key={job._id || i}
//                       job={job}
//                       onClick={() => handleJobClick(job)}
//                       isSelected={selectedJob?._id === job._id}
//                     />
//                   ))
//                 ) : (
//                   <div className="text-center py-20 text-gray-400">
//                     No jobs found.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Job Details Panel - Takes remaining 3 columns when split */}
//             {isSplitView && (
//               <div className="hidden md:block md:col-span-3 h-screen sticky top-0 overflow-y-auto bg-g-800 rounded-lg shadow-xl">
//                 <JobDetailsModal job={selectedJob} onClose={closeDetails} />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {jobs?.length > 0 && !loading && (
//           <div className="sticky bottom-0 py-4 flex justify-center">
//             <AdvancePagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={(page) => setPage(page)}
//             />
//           </div>
//         )}
//       </div>

//       {/* Mobile Full-Screen Modal */}
//       {showMobileModal && selectedJob && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex flex-col md:hidden">
//           <div className="bg-g-800 flex-1 overflow-y-auto rounded-t-2xl">
//             <div className="p-6">
//               <JobDetailsModal job={selectedJob} onClose={closeDetails} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filter */}
//       <JobFilter
//         isOpen={showFilter}
//         onClose={handleToggleFilter}
//         filterData={filterData}
//         setFilterData={setFilterData}
//       />
//     </>
//   );
// };

// export default JobsPage;

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

            <div className="flex gap-5">
              <div
                className={`overflow-y-auto max-h-[calc(100vh-321px)]  md:max-h-[calc(100vh-175px)] overflow-hidden mt-5 mx-auto hide-scrollbar ${
                  selectedJob ? "w-[25%]" : " w-full"
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
                <div className=" w-[75%]">
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
