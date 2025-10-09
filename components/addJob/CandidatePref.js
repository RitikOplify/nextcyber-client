"use client";

import React, { useState } from "react";

export default function CandidatePreference({ form }) {
  const { setValue, getValues, watch } = form;

  // Watch fields
  const selectedQualification = watch("qualification") || [];
  const selectedGender = watch("gender");
  const selectedSkills = watch("skills") || [];
  const selectedCerts = watch("certifications") || [];

  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showCertDropdown, setShowCertDropdown] = useState(false);

  const allSkills = ["React", "Node.js", "Express", "Python", "AWS"];
  const allCerts = ["Certified in Cybersecurity", "PenTest+", "Network+"];

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
      isActive
        ? "bg-primary text-white border-primary "
        : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
    }`;

  const toggleMulti = (field, value) => {
    const current = getValues(field) || [];
    if (current.includes(value)) {
      setValue(
        field,
        current.filter((v) => v !== value),
        { shouldDirty: true }
      );
    } else {
      setValue(field, [...current, value], { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-10">
      {/* Qualification */}
      <div>
        <label className="block mb-2 text-base leading-6 font-medium text-g-200">
          Candidate’s qualification
        </label>
        <div className="flex gap-2 flex-wrap">
          {[
            "High School",
            "Associate Degree",
            "Bachelor's Degree",
            "Master's Degree",
          ].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => toggleMulti("qualification", q)}
              className={pillClass(selectedQualification.includes(q))}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-2 text-base leading-6 font-medium text-g-200">
          Gender preference
        </label>
        <div className="flex gap-2 flex-wrap">
          {["Any", "Male", "Female"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setValue("gender", g)}
              className={pillClass(selectedGender === g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block mb-1 text-base leading-6 font-medium text-g-200">
          Skills
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSkillDropdown(!showSkillDropdown)}
            className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left"
          >
            Select skills
          </button>
          {showSkillDropdown && (
            <div className="absolute mt-2 w-full bg-g-700 border border-g-600 overflow-hidden rounded-lg z-10">
              {allSkills.map((s) => (
                <div
                  key={s}
                  onClick={() => toggleMulti("skills", s)}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedSkills.includes(s)
                      ? "bg-primary text-white"
                      : "hover:bg-g-600"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {selectedSkills.map((s) => (
            <span
              key={s}
              className="px-2 py-1 rounded-full border transition text-xs leading-4 font-medium bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <label className="block mb-1 text-base leading-6 font-medium text-g-200">
          Certifications
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCertDropdown(!showCertDropdown)}
            className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left"
          >
            Select certifications
          </button>
          {showCertDropdown && (
            <div className="absolute mt-2 w-full bg-g-700 border border-g-600 overflow-hidden rounded-lg z-10">
              {allCerts.map((c) => (
                <div
                  key={c}
                  onClick={() => toggleMulti("certifications", c)}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedCerts.includes(c)
                      ? "bg-primary text-white"
                      : "hover:bg-g-600"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4 flex-wrap">
          {selectedCerts.map((c) => (
            <span
              key={c}
              className="px-2 py-1 rounded-full border transition text-xs leading-4 font-medium bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
