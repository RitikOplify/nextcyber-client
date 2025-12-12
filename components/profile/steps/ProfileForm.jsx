"use client";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Pen, Plus, Trash2 } from "lucide-react";
import { Image as LucideImage, X } from "lucide-react";
import Image from "next/image";

export default function ProfileForm({
  educationList = [],
  onOpenAddEducation,
  onEditEducation,
  onRemoveEducation,
  experienceList = [],
  onOpenAddExperience,
  onEditExperience,
  onRemoveExperience,
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const fileRef = useRef(null);

  const file = watch("resume");
  const [preview, setPreview] = useState(
    file instanceof File ? URL.createObjectURL(file) : null
  );

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    setValue("resume", f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    setValue("resume", f);
    setPreview(URL.createObjectURL(f));
  };

  const removeImage = () => {
    setValue("resume", null);
    setPreview(null);
  };
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8">
      <div className="w-1/2">
        <label className="text-g-200 font-medium leading-6 block mb-1">
          Resume <span className="text-dark-red">*</span>
        </label>

        <div
          className={`${
            !preview && "border border-dashed border-g-200 p-5 "
          } rounded text-center cursor-pointer`}
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="relative w-fit">
              <Image
                src={preview}
                alt="Preview"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="bg-dark-red absolute -top-0.5 -right-0.5 p-0.5 rounded-full"
              >
                <X size={12} className=" text-g-100" />
              </button>
            </div>
          ) : (
            <div className="select-none text-sm font-medium  text-g-200 flex flex-col items-center justify-center gap-1">
              <LucideImage size={20} />
              <p>
                <span className="text-primary">Upload a file</span> or drag and
                drop
              </p>
              <p>PNG, JPG, JPEG, GIF • Max 5MB</p>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={handleSelect}
        />
      </div>
      <div className="border border-dashed border-g-300"></div>
      <div>
        <label className="text-g-200 font-medium leading-6 block">
          Education
          <button
            type="button"
            onClick={onOpenAddEducation}
            className="p-2 bg-primary text-white rounded-full ml-1.5 cursor-pointer"
          >
            <Plus size={12} />
          </button>
        </label>

        <div className=" col-span-2">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="border border-g-600 rounded bg-g-700 p-3 flex justify-between items-start mt-5 w-fit gap-15"
            >
              <div className=" flex flex-col gap-y-2.5">
                <div className="font-medium text-g-100 text-sm leading-5">
                  {edu.institute}
                </div>
                <div className="text-xs text-g-200 font-medium leading-4">
                  {edu.level}
                </div>
                <div className="text-xs text-g-300 font-medium leading-4">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEditEducation(idx)}
                  className="h-8 w-8 flex items-center justify-center bg-[#025BCF26] text-g-100 rounded-full cursor-pointer"
                >
                  <Pen size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveEducation(idx)}
                  className="h-8 w-8 flex items-center justify-center bg-[#025BCF26] text-g-100 rounded-full cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-dashed border-g-300"></div>

      <div>
        <label className="text-g-200 font-medium leading-6 block">
          Work Experience
          <button
            type="button"
            onClick={onOpenAddExperience}
            className="p-2 bg-primary text-white rounded-full ml-1.5 cursor-pointer"
          >
            <Plus size={12} />
          </button>
        </label>

        {experienceList.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="border border-g-600 rounded bg-g-700 p-3 flex justify-between items-start mt-5 w-fit gap-15"
          >
            <div className=" flex flex-col gap-y-2.5 ">
              <div className="font-medium text-g-100 text-sm leading-5">
                {exp.companyName}
              </div>
              <div className="text-xs text-g-200 font-medium leading-4">
                {exp.jobTitle}
              </div>
              <div className="text-xs text-g-200 font-medium leading-4">
                {exp.startDate} - {exp.endDate}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEditExperience(idx)}
                className="h-8 w-8 flex items-center justify-center bg-[#025BCF26] text-g-100 rounded-full cursor-pointer"
              >
                <Pen size={16} />
              </button>
              <button
                type="button"
                onClick={() => onRemoveExperience(idx)}
                className="h-8 w-8 flex items-center justify-center bg-[#025BCF26] text-g-100 rounded-full cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
