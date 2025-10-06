"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import JobDetails from "./addJob/JobDetails";
import CandidatePreference from "./addJob/CandidatePreference";
import Compensation from "./addJob/Compensation";
import WorkRequirements from "./addJob/WorkRequirements";
import JobDescription from "./addJob/JobDescription";
// import your step components

// import { asyncCreateJob } from "@/store/actions/jobAction"; // wire your redux action

export default function AddJobStepper() {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      jobTitle: "",
      jobLocation: "",
      additionalBenefits: [],
      minExperience: "0",
      maxExperience: "2",
      contractType: [],
      remotePolicy: "on-site",
      languages: [],
      qualifications: [],
      genderPreference: "any",
      skills: [],
      certifications: [],
      showSalary: false,
      currency: "",
      salaryFrom: "",
      salaryTo: "",
      responsibilities: "",
      requirements: "",
      jobDescription: "",
      attachments: [],
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const steps = [
    { key: "jobDetails", label: "Job details" },
    { key: "candidatePref", label: "Candidate Preference" },
    { key: "compensation", label: "Compensation" },
    { key: "workReq", label: "Work Requirements" },
    { key: "jobDesc", label: "Job Description" },
  ];

  const stepFields = {
    jobDetails: ["jobTitle", "jobLocation"],
    candidatePref: ["minExperience", "maxExperience"],
    compensation: ["showSalary", "salaryFrom", "salaryTo"],
    workReq: ["responsibilities", "requirements"],
    jobDesc: ["jobDescription"],
  };

  const validateCurrentStep = async () => {
    const key = steps[activeStep].key;
    const fields = stepFields[key] || [];
    return await form.trigger(fields);
  };

  const goNext = async () => {
    const ok = await validateCurrentStep();
    if (!ok) return;
    if (activeStep < steps.length - 1) {
      form.reset({ ...form.getValues() }, { keepValues: true });
      setActiveStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const handleFinalSubmit = async (e) => {
    e?.preventDefault?.();
    const allValid = await form.trigger();
    const currentValid = await validateCurrentStep();
    if (!allValid || !currentValid) {
      const errors = form.formState.errors;
      for (let i = 0; i < steps.length; i++) {
        const key = steps[i].key;
        const fields = stepFields[key] || [];
        if (fields.some((f) => errors[f])) {
          setActiveStep(i);
          break;
        }
      }
      return;
    }

    const values = form.getValues();
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((it) => fd.append(`${k}[]`, it));
      else if (v !== undefined && v !== null) fd.append(k, v);
    });
    attachments.forEach((file) => fd.append("attachments[]", file));

    // dispatch(asyncCreateJob(fd, router)); // wire this
    console.log("FormData prepared for submission (debug):");
    // print for debug (not actual values of files in console)
    for (const pair of fd.entries()) console.log(pair[0], pair[1]);
  };

  const renderStep = () => {
    const props = { form, attachments, setAttachments };
    switch (steps[activeStep].key) {
      case "jobDetails":
        return <JobDetails {...props} />;
      case "candidatePref":
        return <CandidatePreference {...props} />;
      case "compensation":
        return <Compensation {...props} />;
      case "workReq":
        return <WorkRequirements {...props} />;
      case "jobDesc":
        return <JobDescription {...props} />;
      default:
        return null;
    }
  };

  // simple step header
  const StepHeader = () => (
    <div className="w-full mx-auto relative mt-5">
      <div
        className="absolute top-4 left-0 w-full h-[2px] z-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(156,156,157,0) 0%, #9C9C9D 50%, rgba(156,156,157,0) 100%)",
        }}
      />
      <div className="flex items-center justify-between w-full relative z-10 max-w-2xl mx-auto">
        {steps.map((s, i) => (
          <div
            key={s.key}
            className="flex-1 flex flex-col items-center relative z-20"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                i <= activeStep
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-900 border-gray-600 text-gray-400"
              }`}
            >
              {i <= activeStep ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className="text-sm">{i + 1}</span>
              )}
            </div>
            <div
              className={`text-xs ${
                i <= activeStep ? "text-white" : "text-gray-500"
              }`}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleFinalSubmit} className="w-full h-full text-gray-200">
      <StepHeader />
      <div className="max-w-[640px] mx-auto mt-8 p-6 bg-[#0C0D0F] rounded-lg border border-[#2F3031]">
        {renderStep()}
        <div className="flex justify-between items-center mt-6">
          <div>
            {activeStep > 0 && (
              <button
                onClick={goPrev}
                type="button"
                className="px-4 py-2 border rounded bg-gray-800"
              >
                Previous
              </button>
            )}
          </div>
          <div className="flex gap-3">
            {activeStep === steps.length - 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    setAttachments([]);
                    setActiveStep(0);
                  }}
                  className="px-4 py-2 border rounded bg-gray-800"
                >
                  Discard
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600">
                  Post Job
                </button>
              </>
            ) : (
              <button
                onClick={goNext}
                type="button"
                className="px-4 py-2 rounded bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
