"use client";
import { BriefcaseBusiness, Search } from "lucide-react";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import SelectField from "../SelectField";
import { companyjobApi } from "@/api/jobApi";

const STATUS_STYLES = {
  ACTIVE: "bg-[#16A600]",
  CLOSED: "bg-[#DB0000]",
  DRAFT: "bg-[#FFAB00]",
};

const STATUS_MAP = {
  Open: "ACTIVE",
  Closed: "CLOSED",
  Draft: "DRAFT",
};

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await companyjobApi({
          page,
          limit: pageSize,
          status,
        });

        setJobs(data?.data?.jobs || []);
        setTotalPages(data?.data?.totalPages || 1);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    getJob();
  }, [page, pageSize, status]);

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
      <div className="rounded-[10px] border border-[#2F3031] mt-5 mx-auto overflow-hidden">
        <div className="flex justify-between bg-[#1B1C1E] p-5">
          <div className="w-[320px]">
            <div className="flex items-center gap-2 bg-[#111214] border border-[#2F3031] rounded-lg px-5 py-4">
              <Search size={20} className="text-[#9C9C9D]" />
              <input
                placeholder="Search job"
                className="bg-transparent text-sm text-[#9C9C9D] outline-none w-full"
              />
            </div>
          </div>

          <div className="w-[200px]">
            <SelectField
              name="status"
              placeholder="Status"
              options={["Open", "Closed", "Draft"]}
              onChange={(value) => {
                setPage(1);
                setStatus(STATUS_MAP[value] || "");
              }}
            />
          </div>
        </div>

        <div className="relative overflow-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#1B1C1E] text-sm text-[#9C9C9D]">
              <tr className="border-y border-[#2F3031] whitespace-nowrap">
                <th className="text-left px-5 py-3 w-[280px]">Job Title</th>
                <th className="text-left px-5 py-3 w-[120px] border-l border-[#2F3031]">
                  Job ID
                </th>
                <th className="text-left px-5 py-3 w-[200px] border-l border-[#2F3031]">
                  Posted On
                </th>
                <th className="text-left px-5 py-3 w-[200px] border-l border-[#2F3031]">
                  Location
                </th>
                <th className="text-left px-5 py-3 w-[160px] border-l border-[#2F3031]">
                  Remote Policy
                </th>
                <th className="text-left px-5 py-3 border-l border-[#2F3031]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#111214] text-sm text-[#6A6B6C]">
              {jobs.length === 0 ? (
                <tr className=" border-b border-[#2F3031]">
                  <td colSpan={6}>
                    <div className="py-17.5 flex flex-col items-center justify-center">
                      <BriefcaseBusiness size={60} className="text-g-200" />
                      <p className="mt-5 font-medium text-sm leading-5 text-g-200">
                        No job listings have been created by your organization.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-[#2F3031] whitespace-nowrap"
                  >
                    <td className="px-4 py-4 underline cursor-pointer">
                      {job.title}
                    </td>
                    <td className="px-5 underline cursor-pointer">
                      {job.id.slice(0, 4).toUpperCase()}
                    </td>
                    <td className="px-5">{formatDate(job.createdAt)}</td>
                    <td className="px-5">{job.location}</td>
                    <td className="px-5">{job.remotePolicy}</td>
                    <td className="px-5">
                      <span
                        className={`inline-flex px-3 py-1 text-xs text-white rounded-full ${
                          STATUS_STYLES[job.status]
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
