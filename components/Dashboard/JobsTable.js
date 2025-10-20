"use client";
import { recruiterjobApi } from "@/api/jobApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  MessageSquareIcon,
  MessageSquareMore,
  Star,
} from "lucide-react";

function JobsTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await recruiterjobApi();
        // API returns: { jobs: [...] }
        setJobs(data.jobs || []);
        console.log("Fetched Jobs:", data.jobs);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };
    getJob();
  }, []);

  const statusColors = {
    Active: "bg-dark-green",
    Inactive: "bg-dark-red",
  };

  return (
    <div className="bg-gradient-to-b from-g-500 to-g-600 p-0.5 rounded-[10px] overflow-hidden">
      <div className=" bg-g-800 rounded-lg overflow-hidden p-5">
        <h4 className=" text-g-100 text-base leading-6 font-semibold mb-1.5">
          Recent Applications
        </h4>
        <p className=" mb-2.5 text-sm font-normal leading-5 text-g-200">List of candidates who applied for the job.</p>
        <table className="w-full text-left border-separate border-spacing-0 overflow-hidden">
          <thead>
            <tr className="bg-g-600 font-medium whitespace-nowrap text-sm leading-5 text-g-200">
              <th className="py-3 pr-2 pl-5 border border-g-500">Candidate</th>
              <th className="py-3 pr-2 pl-5 border border-g-500">
                Applied For
              </th>
              <th className="py-3 pr-2 pl-5 border border-g-500">Date</th>
              <th className="py-3 pr-2 pl-5 border border-g-500">Status</th>
              <th className="py-3 pr-2 pl-5 border border-g-500">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, i) =>
                // handle each student applied to this job
                job.students.length > 0 ? (
                  job.students.map((student, j) => (
                    <tr
                      key={student.id}
                      className="border-g-500 text-g-300 whitespace-nowrap bg-g-700 text-sm leading-5 font-medium"
                    >
                      {/* Candidate */}
                      <td
                        className={`py-3 pr-2 pl-5 flex items-center gap-2 ${
                          jobs.length - 1 === i && job.students.length - 1 === j
                            ? ""
                            : "border-b border-g-500"
                        }`}
                      >
                        <Image
                          src={
                            student.profilePicture?.url || "/default-avatar.png"
                          }
                          alt={student.firstName}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                        <span className="border-b border-dotted">
                          {student.firstName} {student.lastName}
                        </span>
                      </td>

                      {/* Applied For */}
                      <td
                        className={`py-3 pr-2 pl-5 ${
                          jobs.length - 1 === i && job.students.length - 1 === j
                            ? ""
                            : "border-b border-g-500"
                        }`}
                      >
                        <span className="border-b border-dotted">
                          {job.title}
                        </span>
                      </td>

                      {/* Date */}
                      <td
                        className={`py-3 pr-2 pl-5 ${
                          jobs.length - 1 === i && job.students.length - 1 === j
                            ? ""
                            : "border-b border-g-500"
                        }`}
                      >
                        {new Date(student.updatedAt).toLocaleDateString()}
                      </td>

                      {/* Status */}
                      <td
                        className={`py-3 pr-2 pl-5 ${
                          jobs.length - 1 === i && job.students.length - 1 === j
                            ? ""
                            : "border-b border-g-500"
                        }`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs leading-4 text-white font-medium ${
                            statusColors[job.active ? "Active" : "Inactive"]
                          }`}
                        >
                          {job.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Action */}
                      <td
                        className={`py-3 pr-2 pl-5 ${
                          jobs.length - 1 === i && job.students.length - 1 === j
                            ? ""
                            : "border-b border-g-500"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-g-200">
                          <button>
                            <Star size={20} />
                          </button>
                          <button>
                            <MessageSquareMore size={20} />
                          </button>
                          <button>
                            <ArrowUpRight size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // If no students are applied yet
                  <tr
                    key={job.id}
                    className="border-g-500 text-g-300 whitespace-nowrap bg-g-700 text-sm leading-5 font-medium"
                  >
                    <td
                      className={`py-3 pr-2 pl-5 border-b border-g-500 text-g-400`}
                      colSpan={5}
                    >
                      No candidates have applied for{" "}
                      <strong>{job.title}</strong>.
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-5 text-g-400 bg-g-700 border border-g-500"
                >
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobsTable;
