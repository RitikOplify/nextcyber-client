"use client";

import React from "react";

export default function WorkReq({ form }) {
  const { register, getValues, setValue, watch } = form;

  // Watch fields so component re-renders when values change
  const selectedContractTypes = watch("contractType") || [];
  const selectedRemotePolicy = watch("remotePolicy");
  const selectedLanguages = watch("languages") || [];

  const toggleSelection = (field, value) => {
    const current = getValues(field) || [];
    if (current.includes(value)) {
      setValue(
        field,
        current.filter((v) => v !== value),
        { shouldValidate: true, shouldDirty: true }
      );
    } else {
      setValue(field, [...current, value], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
      isActive
        ? "bg-primary text-white border-primary "
        : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
    }`;

  return (
    <div className="space-y-10">
      {/* Work Experience */}
      <div className="flex flex-col">
        <label className="block mb-1 text-base leading-6 font-medium text-g-200">
          Work experience
        </label>
        <div className=" flex gap-3">
          <div className="flex-1">
            <select
              {...register("minExperience")}
              className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left appearance-none outline-none"
            >
              {Array.from({ length: 21 }).map((_, i) => (
                <option key={i} value={i}>
                  {i} year
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center text-g-200 leading-5 text-sm">
            to
          </div>
          <div className="flex-1">
            <select
              {...register("maxExperience")}
              className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left appearance-none outline-none"
            >
              {Array.from({ length: 21 }).map((_, i) => (
                <option key={i} value={i}>
                  {i} year
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contract Type */}
      <div>
        <label className="block mb-2 text-base leading-6 font-medium text-g-200">
          Contract Type
        </label>
        <div className="flex gap-5 flex-wrap">
          {[
            "Freelance",
            "Internship",
            "Temporary Contract",
            "Permanent Contract",
          ].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleSelection("contractType", c)}
              className={pillClass(selectedContractTypes.includes(c))}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Remote Policy */}
      <div>
        <label className="block mb-2 text-base leading-6 font-medium text-g-200">
          Remote Policy
        </label>
        <div className="flex gap-5 flex-wrap">
          {["ONSITE", "HYBRID", "REMOTE"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() =>
                setValue("remotePolicy", r, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={pillClass(selectedRemotePolicy === r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Language Required */}
      <div>
        <label className="block mb-2 text-base leading-6 font-medium text-g-200">
          Language Required
        </label>
        <div className="flex gap-5 flex-wrap">
          {["English", "Hindi", "Spanish"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => toggleSelection("languages", l)}
              className={pillClass(selectedLanguages.includes(l))}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
