"use client";

import React from "react";

export default function CandidatePreference({ form }) {
  const { register, getValues, setValue } = form;

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Experience (from)</label>
          <select
            {...register("minExperience")}
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
          >
            {Array.from({ length: 21 }).map((_, i) => (
              <option key={i} value={i}>
                {i} year
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm mb-1">to</label>
          <select
            {...register("maxExperience")}
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100"
          >
            {Array.from({ length: 21 }).map((_, i) => (
              <option key={i} value={i}>
                {i} year
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Contract type</label>
        <div className="flex gap-2 flex-wrap">
          {["Freelance", "Internship", "Temporary", "Permanent"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                const cur = getValues("contractType") || [];
                if (cur.includes(c))
                  setValue(
                    "contractType",
                    cur.filter((x) => x !== c)
                  );
                else setValue("contractType", [...cur, c]);
              }}
              className={`px-3 py-1 rounded border ${
                (getValues("contractType") || []).includes(c)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-300 border-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Remote policy</label>
        <div className="flex gap-3">
          {["On site", "Hybrid", "Remote"].map((r) => (
            <label
              key={r}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                {...form.register("remotePolicy")}
                value={r.toLowerCase()}
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Languages</label>
        <div className="flex gap-2 flex-wrap">
          {["English", "Hindi", "Spanish"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                const cur = getValues("languages") || [];
                if (cur.includes(l))
                  setValue(
                    "languages",
                    cur.filter((x) => x !== l)
                  );
                else setValue("languages", [...cur, l]);
              }}
              className={`px-3 py-1 rounded border ${
                (getValues("languages") || []).includes(l)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-300 border-gray-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Skills</label>
        <select
          {...register("skills")}
          multiple
          className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-gray-100 h-32"
        >
          {["React", "Node", "AWS", "Docker", "Kubernetes"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
