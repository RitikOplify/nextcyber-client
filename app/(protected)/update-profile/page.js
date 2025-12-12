"use client";
import React, { useState } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import Stepper from "@/components/profile/ProfileStepper";
import AccountDetails from "@/components/profile/steps/AccountDetails";
import ProfileForm from "@/components/profile/steps/ProfileForm";
import TechnicalForm from "@/components/profile/steps/TechnicalForm";
import AddEducationModal from "@/components/profile/steps/AddEducationModal";
import AddExperienceModal from "@/components/profile/steps/AddExperienceModal";

export default function SettingsPage() {
  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      currency: "",
      gender: "",
      nationality: "",
      language: [],
      expectedSalary: "",
      hourlyRate: "",
      institute: "",
      level: "",
      startDate: "",
      endDate: "",
      education: [],
      experience: [],
      certificates: [],
      skills: [],
    },
  });

  const { control, trigger, handleSubmit, getValues } = methods;

  const eduFieldArray = useFieldArray({ control, name: "education" });
  const expFieldArray = useFieldArray({ control, name: "experience" });

  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [eduEditIndex, setEduEditIndex] = useState(null);

  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expEditIndex, setExpEditIndex] = useState(null);

  const onNext = async () => {
    const ok = await trigger();
    if (!ok) return;
    setStep((s) => Math.min(2, s + 1));
  };

  const onBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = (data) => {
    console.log("SUBMIT", data);
  };

  const addEducation = (item) => {
    eduFieldArray.append(item);
  };
  const updateEducation = (index, item) => {
    eduFieldArray.update(index, item);
  };
  const removeEducation = (index) => {
    eduFieldArray.remove(index);
  };

  const addExperience = (item) => {
    expFieldArray.append(item);
  };
  const updateExperience = (index, item) => {
    expFieldArray.update(index, item);
  };
  const removeExperience = (index) => {
    expFieldArray.remove(index);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto">
          <Stepper step={step} />

          <div className="rounded-[10px] p-0.5 bg-gradient-to-r from-[#2F3031] to-[#1B1C1E] mt-10">
            <div className="p-10 bg-g-800 rounded-lg">
              {step === 0 && <AccountDetails />}
              {step === 1 && (
                <ProfileForm
                  educationList={eduFieldArray.fields}
                  onOpenAddEducation={() => {
                    setEduEditIndex(null);
                    setEduModalOpen(true);
                  }}
                  onEditEducation={(idx) => {
                    setEduEditIndex(idx);
                    setEduModalOpen(true);
                  }}
                  onRemoveEducation={removeEducation}
                  experienceList={expFieldArray.fields}
                  onOpenAddExperience={() => {
                    setExpEditIndex(null);
                    setExpModalOpen(true);
                  }}
                  onEditExperience={(idx) => {
                    setExpEditIndex(idx);
                    setExpModalOpen(true);
                  }}
                  onRemoveExperience={removeExperience}
                />
              )}
              {step === 2 && <TechnicalForm />}
              <div className="flex justify-end gap-3.5 mt-8">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-3 text-sm font-semibold leading-5 bg-g-600 text-white rounded cursor-pointer"
                  >
                    Back
                  </button>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-4 py-3 text-sm font-semibold leading-5 bg-primary text-white rounded cursor-pointer"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-3 text-sm font-semibold leading-5 bg-primary text-white rounded cursor-pointer"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {eduModalOpen && (
        <AddEducationModal
          isOpen={eduModalOpen}
          onClose={() => setEduModalOpen(false)}
          onSave={(payload) => {
            if (eduEditIndex === null) addEducation(payload);
            else updateEducation(eduEditIndex, payload);
            setEduModalOpen(false);
          }}
          initialData={
            eduEditIndex !== null ? getValues("education")[eduEditIndex] : null
          }
        />
      )}

      {expModalOpen && (
        <AddExperienceModal
          isOpen={expModalOpen}
          onClose={() => setExpModalOpen(false)}
          onSave={(payload) => {
            if (expEditIndex === null) addExperience(payload);
            else updateExperience(expEditIndex, payload);
            setExpModalOpen(false);
          }}
          initialData={
            expEditIndex !== null ? getValues("experience")[expEditIndex] : null
          }
        />
      )}
    </FormProvider>
  );
}
