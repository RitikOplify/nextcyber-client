"use client";

import React from "react";
import { Plus, X } from "lucide-react";

export default function JobDetails({ form }) {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[#9C9C9D] font-medium leading-6 block mb-1">
          Job title
        </label>
        <input
          {...register("jobTitle", { required: "Job title is required" })}
          placeholder="e.g. Penetration tester"
          className={`w-full py-4 px-5 rounded-[8px] border text-g-300 outline-none ${
            errors.jobTitle ? "border-red-600" : "border-g-600"
          } bg-g-700`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <label className="text-[#9C9C9D] font-medium leading-6 block mb-1">
          Job location
        </label>
        <input
          {...register("jobLocation", { required: "Job location is required" })}
          placeholder="City or Remote"
          className={`w-full py-4 px-5 rounded-[8px] border text-g-300 outline-none ${
            errors.jobLocation ? "border-red-600" : "border-g-600"
          } bg-g-700`}
        />
        {errors.jobLocation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.jobLocation.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-[#9C9C9D] font-medium leading-6 block mb-1">
          Additional benefits
        </label>
        <input
          type="text"
          placeholder="Type and press Enter to add"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const v = e.target.value.trim();
              if (!v) return;
              const cur = getValues("additionalBenefits") || [];
              setValue("additionalBenefits", [...cur, v]);
              e.target.value = "";
            }
          }}
          className={`w-full py-4 px-5 rounded-[8px] border text-g-300 outline-none border-g-600 bg-g-700`}
        />
        <div className="mt-3 flex gap-2 flex-wrap">
          {(watch("additionalBenefits") || []).map((b, i) => (
            <div
              key={i}
              className="px-2 py-1 rounded-full bg-g-600 border border-g-500 text-xs font-medium text-g-200 leading-4 flex items-center gap-1"
            >
              <Plus size={12} />
              <span>{b}</span>
              <button
                onClick={() => {
                  const cur = getValues("additionalBenefits") || [];
                  setValue(
                    "additionalBenefits",
                    cur.filter((_, idx) => idx !== i)
                  );
                }}
                type="button"
                className="ms-3 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
