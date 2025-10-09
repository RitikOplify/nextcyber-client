"use client";
import React, { useState } from "react";
import Step1 from "./OnBoarding/Step1";
import Step2 from "./OnBoarding/Step2";
import Step3 from "./OnBoarding/Step3";
import Step4 from "./OnBoarding/Step4";
import Step5 from "./OnBoarding/Step5";
import Step6 from "./OnBoarding/Step6";
import Step7 from "./OnBoarding/Step7";
import { studentOnboardingApi } from "@/api/studentApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import Step1LeftSide from "./OnBoarding/Step1LeftSide";

function OnBoarding({ id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      hearFrom: "",
      gender: "Male",
      nationalities: [],
      location: "",
      languages: [],
      currency: "",
      profilePicture: null,
      contractType: "",
      remotePolicy: "",
      certificates: [],
      skills: [],
    },
  });

  const [files, setFiles] = useState({
    profilePicture: null,
  });

  const steps = [
    { name: "STEP1", fields: [] },
    { name: "STEP2", fields: ["hearFrom"] },
    { name: "STEP3", fields: [] },
    { name: "STEP4", fields: [] },
    { name: "STEP5", fields: [] },
    {
      name: "STEP6",
      fields: ["gender", "nationalities", "location", "languages", "currency"],
    },
    {
      name: "STEP7",
      fields: ["contractType", "remotePolicy", "certificates", "skills"],
    },
  ];

  const validateCurrentStep = async () => {
    const currentStepFields = steps[activeStep].fields;
    if (currentStepFields && currentStepFields.length > 0) {
      const isValid = await methods.trigger(currentStepFields);
      return isValid;
    }
    return true;
  };

  const goNext = async () => {
    if (activeStep < steps.length - 1) {
      const isValid = await validateCurrentStep();
      if (!isValid) {
        toast.error("Please fill in all required fields");
        return;
      }
      setActiveStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const handleFinalSubmit = async (data) => {
    const formData = new FormData();

    // Append simple fields
    Object.entries(data).forEach(([key, value]) => {
      if (
        !Array.isArray(value) &&
        value !== undefined &&
        value !== null &&
        key !== "profilePicture"
      ) {
        formData.append(key, value);
      }
    });

    // Handle arrays
    if (data.nationalities && data.nationalities.length > 0) {
      formData.append("nationalities", JSON.stringify(data.nationalities));
    }

    if (data.languages && data.languages.length > 0) {
      formData.append("languages", JSON.stringify(data.languages));
    }

    if (data.certificates && data.certificates.length > 0) {
      formData.append("certificates", JSON.stringify(data.certificates));
    }

    if (data.skills && data.skills.length > 0) {
      formData.append("skills", JSON.stringify(data.skills));
    }

    // Handle file upload
    if (files.profilePicture) {
      formData.append("profilePicture", files.profilePicture);
    }
    console.log(data);

    setLoading(true);
    try {
      const { data: responseData } = await studentOnboardingApi(id, formData);
      dispatch(setUser(responseData.student));
      toast.success("Onboarding completed successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Request Failed. Please Try Again!");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (steps[activeStep].name) {
      case "STEP1":
        return <Step1 goNext={goNext} />;
      case "STEP2":
        return <Step2 />;
      case "STEP3":
        return <Step3 />;
      case "STEP4":
        return <Step4 />;
      case "STEP5":
        return <Step5 />;
      case "STEP6":
        return <Step6 files={files} setFiles={setFiles} />;
      case "STEP7":
        return <Step7 />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-g-900 h-screen overflow-hidden gap-20">
      <div className="flex">
        <div className=" w-1/3 h-screen bg-primary">
          <Step1LeftSide />
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFinalSubmit)}
            className="w-2/3 h-screen overflow-y-auto"
          >
            {renderStep()}
            {steps[activeStep].name !== "STEP1" && (
              <div className="flex justify-end w-full px-20 items-center mt-20 gap-5 pb-20">
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
                  onClick={
                    steps[activeStep].name !== "STEP7" ? goNext : undefined
                  }
                  type={
                    steps[activeStep].name !== "STEP7" ? "button" : "submit"
                  }
                  disabled={loading}
                  className="px-16 py-3 flex items-center gap-2 rounded bg-primary text-white text-sm leading-5 font-medium disabled:opacity-50"
                >
                  {loading && <Loader2 size={20} className=" animate-spin" />}
                  {steps[activeStep].name !== "STEP7" ? "Next" : "Continue"}
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default OnBoarding;
