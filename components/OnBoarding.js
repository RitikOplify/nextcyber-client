"use client";
import React, { use, useState } from "react";
import Step1 from "./OnBoarding/Step1";
import Step2 from "./OnBoarding/Step2";
import Step3 from "./OnBoarding/Step3";
import Step4 from "./OnBoarding/Step4";
import Step5 from "./OnBoarding/Step5";
import { studentOnboardingApi } from "@/api/studentApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";

function OnBoarding({ id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [hearFrom, setHearFrom] = useState("");
  const steps = ["STEP1", "STEP2", "STEP3", "STEP4", "STEP5"];
  const [loading, setLoading] = useState(false);
  const renderStep = () => {
    switch (steps[activeStep]) {
      case "STEP1":
        return <Step1 goNext={goNext} />;
      case "STEP2":
        return <Step2 setHearFrom={setHearFrom} hearFrom={hearFrom} />;
      case "STEP3":
        return <Step3 />;
      case "STEP4":
        return <Step4 />;
      case "STEP5":
        return <Step5 />;
      default:
        return null;
    }
  };

  const goNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      const { data } = await studentOnboardingApi(id, { hearFrom });
      dispatch(setUser(data.student));
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      
      toast.error("Request Failed Please Try Again!");
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 bg-g-900 flex flex-col min-h-[calc(100vh-57.33px)]  sm:min-h-[calc(100vh-73.33px)] gap-20 ">
      {renderStep()}
      {steps[activeStep] !== "STEP1" && (
        <div className="flex justify-between items-center w-fit gap-5 pb-20 mx-auto">
          {activeStep > 0 && (
            <button
              onClick={goPrev}
              type="button"
              className="text-g-200 text-sm leading-5 font-medium"
            >
              Back
            </button>
          )}

          <button
            onClick={steps[activeStep] !== "STEP5" ? goNext : updateUser}
            type="button"
            className="px-16 py-3 flex items-center gap-2 rounded bg-primary text-white text-sm leading-5 font-medium"
          >
            {loading && <Loader2 size={20} className=" animate-spin" />}
            {steps[activeStep] !== "STEP5" ? "Next" : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}

export default OnBoarding;
