"use client";

import { BriefcaseBusiness, EyeIcon, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetJobApplicants } from "@/store/actions/jobActions";
import Link from "next/link";
import Table from "@/components/ui/Table";
import Pagination from "@/components/Pagination";
import Search from "@/components/ui/Search";
import { useParams } from "next/navigation";

const STATUS_STYLES = {
  APPLIED: "bg-g-50",
  INVITED: "bg-[#16A600]",
  SHORTLISTED: "bg-[#FFAB00]",
  INTERVIEW: "bg-[#0066FF]",
  INTERVIEWED: "bg-[#7846EF]",
  HIRED: "bg-[#16A600]",
};

const tabs = [
  { label: "Applied", count: 0, active: true },
  { label: "Shortlisted", count: 12, active: false },
  { label: "Invited to Interview", count: 7, active: false },
  { label: "Interviewed", count: 4, active: false },
  { label: "Hired", count: 1, active: false },
];

function JobDetailsHeader({ status, setStatus }) {
  return (
    <div className="text-100">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Job Details</h1>
          <button className="py-1 px-2 bg-g-200 hover:bg-g-300 text-100 text-xs rounded transition-colors">
            View Job
          </button>
        </div>
        <Link
          href="/add-new-job"
          className="h-7 flex items-center gap-2 px-2 py-1 bg-g-600 hover:bg-g-800 rounded-[28px] border border-g-400 transition-colors text-g-100"
        >
          <Undo2 className="w-5 h-5" />
          <span className="text-xs">Back</span>
        </Link>
      </div>

      {/* Tabs Section */}
      <div className="flex items-center gap-0 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-5 py-2 whitespace-nowrap transition-colors relative ${
              tab.label === status
                ? "text-white"
                : "text-g-200 hover:text-g-300"
            }`}
            onClick={() => setStatus(tab.label)}
          >
            <span className="text-sm font-medium">{tab.label}</span>
            <span
              className={`flex items-center justify-center w-8 h-6 rounded-full text-xs font-semibold ${
                tab.label === status
                  ? "bg-light-blue text-primary"
                  : "bg-primary text-white"
              }`}
            >
              {tab.count}
            </span>
            {tab.label === status && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { applications, totalApplicationsPages } = useSelector(
    (state) => state.jobs
  );
  const isFirstLoad = useRef(true);
  const { id } = useParams();

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      if (applications.length > 0) return;
    }

    dispatch(
      asyncGetJobApplicants(
        {
          id,
          page,
          limit: pageSize,
          status: status?.toUpperCase() ?? "",
          search,
        },
        setLoading
      )
    );
  }, [page, pageSize, status, search, dispatch]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      label: "Job Title",
      key: "title",
      render: (row) => (
        <span className="underline cursor-pointer">{row.title}</span>
      ),
    },
    {
      label: "Job ID",
      key: "id",
      render: (row) => (
        <span className="underline cursor-pointer">
          {row.id.slice(0, 4).toUpperCase()}
        </span>
      ),
    },
    {
      label: "Posted On",
      key: "createdAt",
      render: (row) => formatDate(row.createdAt),
    },
    {
      label: "Location",
      key: "location",
    },
    {
      label: "Remote Policy",
      key: "remotePolicy",
    },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span
          className={`inline-flex px-3 py-1 text-xs text-white rounded-full ${
            STATUS_STYLES[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      label: "Applicants",
      key: "applicantCount",
      render: (row) => (
        <Link href={`/jobs/${row.id}`}>
          <EyeIcon />
        </Link>
      ),
    },
  ];

  const NotFound = () => (
    <div className="py-17.5 flex flex-col items-center justify-center ">
      <BriefcaseBusiness size={60} className="text-g-200" />
      <p className="mt-5 font-medium text-sm leading-5 text-g-200">
        No job listings have been created by your organization.
      </p>
    </div>
  );

  return (
    <div>
      <JobDetailsHeader status={status} setStatus={setStatus} />
      <div className="rounded-primary mt-5 mx-auto overflow-hidden border border-g-500">
        <div className="flex justify-between bg-g-600 p-5">
          <Search
            placeholder="Search by job title or ID"
            value={search}
            setValue={(val) => {
              setPage(1);
              setSearch(val);
            }}
          />
        </div>

        <Table
          columns={columns}
          data={applications}
          NotFound={NotFound}
          maxHeight="calc(100vh - 297.33px)"
          loading={loading}
        />

        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={totalApplicationsPages}
        />
      </div>
    </div>
  );
}
