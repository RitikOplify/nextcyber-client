"use client";
import SelectField from "@/components/SelectField";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function TechnicalForm({ showErrors = false }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const contractType = watch("contractType");
  const remotePolicy = watch("remotePolicy");
  const skills = watch("skills");
  const certificates = watch("certificates");

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
      isActive
        ? "bg-primary text-white border-primary"
        : "bg-g-600 text-g-200 border-g-500 hover:bg-g-700"
    }`;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8">
      <div>
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Contract Type
        </label>

        <div className="flex gap-2 flex-wrap">
          {["FREELANCE", "INTERNSHIP", "TEMPORARY", "PERMANENT"].map(
            (option) => (
              <button
                type="button"
                key={option}
                onClick={() => setValue("contractType", option)}
                className={`px-4 py-2 rounded-full cursor-pointer capitalize border bg-g-600 transition text-sm leading-5 font-medium ${
                  contractType === option
                    ? "text-white border-primary"
                    : "text-g-200 border-g-500 hover:bg-g-700"
                }`}
              >
                {option.toLowerCase()}
              </button>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Remote Policy
        </label>

        <div className="flex gap-2 flex-wrap">
          {["ONSITE", "REMOTE", "HYBRID"].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setValue("remotePolicy", option)}
              className={`px-4 py-2 rounded-full border capitalize bg-g-600 cursor-pointer transition text-sm leading-5 font-medium ${
                remotePolicy === option
                  ? "text-white border-primary"
                  : "text-g-200 border-g-500 hover:bg-g-700"
              }`}
            >
              {option.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 w-1/2">
        <div>
          <SelectField
            label="Certificates"
            name="certificates"
            placeholder="Certificates"
            multiple
            options={[
              "CCNA",
              "AWS Certified Cloud Practitioner",
              "AWS Certified SysOps Administrator - Associate",
            ]}
            rules={{ required: "Certificates are required" }}
            showErrors={showErrors}
          />

          <div className="flex gap-2 mt-4 flex-wrap">
            {certificates?.length > 0 &&
              certificates.map((certificate) => (
                <span key={certificate} className={pillClass()}>
                  {certificate}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-1/2">
        <div>
          <SelectField
            label="Skills"
            name="skills"
            placeholder="Skills"
            multiple
            options={[
              "Analytical Thinking",
              "Advanced Red Team Operations",
              "JavaScript",
              "Node.js",
            ]}
            rules={{ required: "Skills are required" }}
            showErrors={showErrors}
          />

          <div className="flex gap-2 mt-4 flex-wrap">
            {skills?.length > 0 &&
              skills.map((skill) => (
                <span key={skill} className={pillClass()}>
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
