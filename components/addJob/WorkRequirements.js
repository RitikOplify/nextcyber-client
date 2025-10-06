"use client";

import React from "react";

export default function WorkRequirements({ form }) {
  const { register, getValues, setValue } = form;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm mb-1">Responsibilities</label>
        <textarea {...register("responsibilities")} className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100 h-28" />
      </div>

      <div>
        <label className="block text-sm mb-1">Requirements</label>
        <textarea {...register("requirements")} className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100 h-28" />
      </div>

      <div>
        <label className="block text-sm mb-1">Qualifications</label>
        <div className="flex gap-2 flex-wrap">
          {["High School", "Bachelor's Degree", "Master's Degree"].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                const cur = getValues("qualifications") || [];
                if (cur.includes(q)) setValue("qualifications", cur.filter(x => x !== q));
                else setValue("qualifications", [...cur, q]);
              }}
              className={`px-3 py-1 rounded border ${(getValues("qualifications")||[]).includes(q) ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-300 border-gray-700"}`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
