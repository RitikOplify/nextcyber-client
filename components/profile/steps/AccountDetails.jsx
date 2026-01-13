"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import SelectField from "@/components/SelectField";
import Image from "next/image";
import { Image as LucideImage, X } from "lucide-react";
import toast from "react-hot-toast";
import LocationSearchInput from "@/components/helper/LocationSearchInput";

export default function AccountDetails({ showErrors = true }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileRef = useRef(null);
  const gender = watch("gender");
  const file = watch("profilePicture");

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file instanceof File) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setValue("profilePicture", f, { shouldValidate: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setValue("profilePicture", f, { shouldValidate: true });
  };

  const removeImage = () => {
    setValue("profilePicture", null, { shouldValidate: true });
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    register("profilePicture", {
      required: "Profile picture is required",
    });
  }, [register]);

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
      <div className="col-span-2 gap-y-6">
        <div className="w-1/2">
          <label className="text-g-200 font-medium leading-6 block mb-1">
            Profile Picture <span className="text-dark-red">*</span>
          </label>

          <div
            className={`${
              !preview && !file?.url && "border border-dashed border-g-200 p-5 "
            } rounded text-center cursor-pointer`}
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {preview || file?.url ? (
              <div className="relative w-fit">
                <Image
                  src={preview || file?.url}
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
              <div className="select-none text-sm font-medium text-g-200 flex flex-col items-center justify-center gap-1">
                <LucideImage size={20} />
                <p>
                  <span className="text-primary">Upload an image</span> or drag
                  and drop
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

          {showErrors && errors.profilePicture && (
            <p className="mt-1 text-sm text-red-400">
              {errors.profilePicture.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="text-g-200 font-medium leading-6 block mb-1">
          First Name
        </label>
        <input
          {...register("firstName", {
            required: "First name required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
          className="w-full py-4 px-5 rounded-lg border text-g-300 outline-none bg-g-700 border-g-600"
          placeholder="Enter first name"
        />
        {showErrors && <p className="error">{errors.firstName?.message}</p>}
      </div>
      <div>
        <label className="text-g-200 font-medium leading-6 block mb-1">
          Last Name
        </label>
        <input
          {...register("lastName", { required: "Last name required" })}
          className="w-full py-4 px-5 rounded-lg border text-g-300 outline-none bg-g-700 border-g-600"
          placeholder="Enter last name"
        />
        {showErrors && <p className="error">{errors.lastName?.message}</p>}
      </div>
      <div>
        <label className="text-g-200 font-medium leading-6 block mb-1">
          Location
        </label>
        <LocationSearchInput 
          value={watch("location")}
          onPlaceSelected={
            (place) => {
              const address = `${place.city || ""}, ${place.state || ""}, ${place.country || ""}`.replace(/,\s*,/g, ',').replace(/^\s*,|,\s*$/g, '');
              setValue("location", address, { shouldDirty: true });
            }
          }
        />
        {showErrors && <p className="error">{errors.location?.message}</p>} 
      </div>
      <SelectField
        label="Currency"
        name="currency"
        options={["INR", "USD", "EUR"]}
        placeholder="Select currency"
        rules={{ required: "Currency required" }}
        showErrors={showErrors}
      />

      <div className="col-span-2">
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Gender preference
        </label>
        <div className="flex gap-2 flex-wrap">
          {["MALE", "FEMALE", "PREFER_NOT_TO_SAY"].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() =>
                setValue("gender", option, { shouldValidate: true })
              }
              className={`px-4 py-2 cursor-pointer rounded-full border capitalize transition text-sm leading-5 bg-g-600 text-g-200 border-g-500 font-medium ${
                gender === option ? "border-primary" : "hover:bg-g-700"
              }`}
            >
              {option.replaceAll("_", " ").toLowerCase()}
            </button>
          ))}
        </div>
        {showErrors && errors.gender && (
          <p className="mt-1 text-sm text-red-400">{errors.gender.message}</p>
        )}
      </div>

      <SelectField
        label="Nationality"
        name="nationalities"
        multiple
        options={["India", "USA", "Canada"]}
        showErrors={showErrors}
      />
      <SelectField
        label="Language"
        name="languages"
        multiple
        options={["English", "Hindi", "Gujarati"]}
        showErrors={showErrors}
      />

      <div>
        <label className="text-g-200 font-medium leading-6 block mb-1">
          Expected Salary
        </label>
        <input
          {...register("expectedSalary")}
          className="w-full py-4 px-5 rounded-lg border text-g-300 outline-none bg-g-700 border-g-600"
          placeholder="Enter your salary"
        />
      </div>

      <div>
        <label className="text-g-200 font-medium leading-6 block mb-1">
          Hourly Rate
        </label>
        <input
          {...register("hourlyRate")}
          className="w-full py-4 px-5 rounded-lg border text-g-300 outline-none bg-g-700 border-g-600"
          placeholder="Enter your hourly rate"
        />
      </div>
    </div>
  );
}
