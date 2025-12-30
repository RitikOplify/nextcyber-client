"use client";
import { ChevronDown } from "lucide-react";
import Pagination from "./Pagination";

export default function BillingPage() {
  return (
    <div className="space-y-5">
      <div className="flex gap-5">
        <div className="w-[554px] rounded-xl bg-g-600">
          <div className="flex items-center justify-between px-5 py-4 border-b border-g-700">
            <div className="flex items-center gap-3">
              <h3 className="text-g-100 text-base font-medium">Pro Plan</h3>
              <span className="px-2 py-1 text-xs font-medium rounded bg-dark-green text-basewhite">
                Monthly
              </span>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-2 text-white text-xs font-medium">
              Change Plan →
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

        <div className="w-[554px] rounded-xl bg-g-600">
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
          <input
            className="w-[320px] px-4 py-3 rounded-lg bg-g-700 border border-g-500 text-sm text-g-300 outline-none"
            placeholder="  Search job"
          />

          <div className="w-[200px] px-4 py-3 rounded-lg bg-g-700 border border-g-500 text-sm text-g-300 flex justify-between">
            Status <ChevronDown size={20} />
          </div>
        </div>
        <table className="w-full border-t border-g-500 text-sm">
          <thead className="bg-g-600 text-g-200 border-b border-g-500">
            <tr>
              {["Invoice", "Status", "Date", "Amount", "Action"].map((h) => (
                <th
                  key={h}
                  className="text-left font-medium px-5 py-3 border-r last:border-r-0 border-g-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="bg-g-700 border-b border-g-500">
                <td className="px-5 py-4 text-g-200">Invoice-2024-xd912c</td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-basewhite
              ${i === 0 ? "bg-dark-yellow" : "bg-dark-green"}`}
                  >
                    {i === 0 ? "upcoming" : "paid"}
                  </span>
                </td>

                <td className="px-5 py-4 text-g-300">July 25, 2025</td>
                <td className="px-5 py-4 text-g-300">$99.00</td>

                <td className="px-5 py-4">
                  {i === 0 ? (
                    <span className="px-3 py-1 rounded bg-bg text-xs text-g-300">
                      None
                    </span>
                  ) : (
                    <button className="flex items-center gap-2 px-3 py-1 rounded bg-primary-2-light text-primary-2 text-xs font-medium">
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={1}
          setPage={() => {}}
          pageSize={10}
          setPageSize={() => {}}
          totalPages={1}
        />
      </div>
    </div>
  );
}
