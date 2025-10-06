"use client";

import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Compensation({ form }) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  // simple currency select implementation could be replaced by your CustomSelect
  return (
    <div className="space-y-6">
      <div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register("showSalary")} />
          <span>Show Salary</span>
        </label>
      </div>

      <div>
        <label className="block text-sm mb-1">Currency</label>
        <div className="relative">
          <input
            {...register("currency")}
            placeholder="INR / USD"
            className={`w-full p-3 rounded border ${
              errors.currency ? "border-red-500" : "border-gray-700"
            } bg-gray-900 text-gray-100`}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <input
          {...register("salaryFrom", { valueAsNumber: true })}
          placeholder="From"
          className="flex-1 p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
        />
        <div className="flex items-center">to</div>
        <input
          {...register("salaryTo", { valueAsNumber: true })}
          placeholder="To"
          className="flex-1 p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
        />
      </div>
    </div>
  );
}
