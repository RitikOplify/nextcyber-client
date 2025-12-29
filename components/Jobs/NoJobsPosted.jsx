"use client";

import { Plus, Bookmark, Clock, Zap, Receipt, Calendar } from "lucide-react";

export default function NoJobsPosted({ onClick }) {
  return (
    <div className="flex flex-col items-center gap-6 w-[481px] mx-auto mt-15">
      <div className="relative w-[460px] h-[280px] rounded-xl bg-[#DBF9FF] flex justify-center overflow-hidden">
        <div className="absolute top-[59px] w-[364px] h-[300px] rounded-xl bg-g-600 border border-g-500  p-5 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="h-6 w-[72px] bg-[#DBF9FF] rounded" />
              <div className="h-6 w-[72px] bg-[#DBF9FF] rounded" />
            </div>

            <div className="h-6 w-6 bg-g-500 rounded flex items-center justify-center">
              <Bookmark size={16} className="text-g-300" />
            </div>
          </div>

          <div>
            <p className="text-g-200 text-base font-semibold">
              Safety & Security Engineer
            </p>
            <p className="text-g-200 text-sm">Texas, USA</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <MetaItem icon={<Clock size={16} />} />
            <MetaItem icon={<Zap size={16} />} />
            <MetaItem icon={<Receipt size={16} />} />
            <MetaItem icon={<Calendar size={16} />} wide />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-medium text-accent-color-1">
          No Jobs Posted
        </h2>
        <p className="text-sm text-g-200 max-w-[420px]">
          Post your first job today and take the first step toward building a
          strong, future-ready team.
        </p>
      </div>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary border border-g-500 text-white text-sm font-medium"
        onClick={onClick}
      >
        <Plus size={18} />
        Post a Job
      </button>
    </div>
  );
}

function MetaItem({ icon, wide = false }) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded bg-g-600 ${
        wide ? "w-[102px]" : "w-[74px]"
      }`}
    >
      <span className="text-g-300">{icon}</span>
      <span className="h-4 w-[44px] rounded bg-g-300" />
    </div>
  );
}
