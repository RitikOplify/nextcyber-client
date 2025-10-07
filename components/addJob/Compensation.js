"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Compensation({ form }) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const [showSalary, setShowSalary] = useState(false);

  // simple currency select implementation could be replaced by your CustomSelect
  return (
    <div className="space-y-10">
      <div className=" flex flex-col ">
        <span className=" text-g-200 text-base leading-6 font-medium mb-2">
          Show Salary
        </span>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showSalary}
            onChange={(e) => setShowSalary(e.target.checked)}
            className="sr-only peer"
          />
          {/* Switch track */}
          <div className="relative w-9 h-5 bg-g-300 rounded-full transition-colors peer-checked:bg-primary">
            {/* Switch thumb */}
            <span
              className={`absolute top-1/2 transform -translate-y-1/2 left-[3px] w-3.5 h-3.5 bg-g-50 rounded-full transition-transform ${
                showSalary ? "translate-x-4" : ""
              }`}
            ></span>
          </div>
          <span className=" text-g-200 text-base leading-6">Checked</span>
        </label>
      </div>

      <div>
        <label className="block mb-1 text-base leading-6 font-medium text-g-200">
          Currency
        </label>
        <select
          {...register("currency")}
          defaultValue=""
          className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left appearance-none outline-none"
        >
          <option value="" disabled>
            Select Currency
          </option>
          {["INR", "USD"].map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-base leading-6 font-medium text-g-200">
          Salary per month
        </label>
        <div className="flex gap-3">
          <input
            {...register("salaryFrom", { valueAsNumber: true })}
            placeholder="From"
            className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left outline-none"
          />
          <div className="flex items-center text-g-200 leading-5 text-sm">
            to
          </div>
          <input
            {...register("salaryTo", { valueAsNumber: true })}
            placeholder="To"
            className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left  outline-none"
          />
        </div>
      </div>
    </div>
  );
}
