"use client";
import Pagination from "./Pagination";
import Search from "./ui/Search";
import Filter from "./ui/Filter";
import Table from "./ui/Table";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function BillingPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const invoices = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    invoice: "Invoice-2024-xd912c",
    status: i === 0 ? "upcoming" : "paid",
    date: "July 25, 2025",
    amount: "$99.00",
  }));

  const columns = [
    {
      label: "Invoice",
      key: "invoice",
      render: (row) => <span className="text-g-200">{row.invoice}</span>,
    },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium text-basewhite
          ${row.status === "upcoming" ? "bg-dark-yellow" : "bg-dark-green"}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      label: "Date",
      key: "date",
      render: (row) => <span className="text-g-300">{row.date}</span>,
    },
    {
      label: "Amount",
      key: "amount",
      render: (row) => <span className="text-g-300">{row.amount}</span>,
    },
    {
      label: "Action",
      key: "action",
      render: (row) =>
        row.status === "upcoming" ? (
          <span className="px-3 py-1 rounded bg-bg text-xs text-g-300">
            None
          </span>
        ) : (
          <button className="flex items-center gap-2 px-3 py-1 rounded bg-primary-2-light text-primary-2 text-xs font-medium">
            Download
          </button>
        ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-primary bg-g-600">
          <div className="flex items-center justify-between px-5 py-4 border-b border-g-700">
            <div className="flex items-center gap-3">
              <h3 className="text-g-100 text-base font-medium">Pro Plan</h3>
              <span className="px-2 py-1 text-xs font-medium rounded bg-dark-green text-basewhite">
                Monthly
              </span>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-2 text-white text-xs font-medium">
              Change Plan <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex gap-5 p-5">
            <div className="flex-1 p-4 rounded-lg bg-g-700 border border-g-500">
              <p className="text-g-100 text-base font-medium">$99</p>
              <p className="text-sm text-g-200">Next Bill Amount</p>
            </div>

            <div className="flex-1 p-4 rounded-lg bg-g-700 border border-g-500">
              <p className="text-g-100 text-base font-medium">28 Dec, 2025</p>
              <p className="text-sm text-g-200">Next Bill Date</p>
            </div>
          </div>
        </div>

        <div className="rounded-primary bg-g-600">
          <div className="px-5 py-4 border-b border-g-700">
            <h3 className="text-g-100 text-base font-medium">
              Billing Details
            </h3>
          </div>

          <div className="flex gap-6 p-5 text-sm">
            <div className="space-y-4 text-g-100 font-medium">
              <p>Name</p>
              <p>Address</p>
              <p>Contact</p>
            </div>

            <div className="space-y-4 text-g-200">
              <p>Pradeep Gusain</p>
              <p>Keizersgracht 136, 1015 CW Amsterdam, Netherlands</p>
              <p>Jason Tatum</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-g-500 overflow-hidden">
        <div className="flex justify-between items-center p-5 bg-g-600">
          <Search
            placeholder="Search by job title or ID"
            value={search}
            setValue={(val) => {
              setPage(1);
              setSearch(val);
            }}
          />

          <Filter
            placeholder="Status"
            options={["Open", "Closed", "Draft"]}
            onChange={(value) => {
              setPage(1);
              setStatus(value || "");
            }}
          />
        </div>

        <Table columns={columns} data={invoices} />

        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
