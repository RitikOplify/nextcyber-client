"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { SaveButton } from "@/components/ui/SaveButton";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import SelectField from "@/components/SelectField";
import { updateCompanyApi } from "@/api/companyApi";
import { getErrorMessage } from "@/utils/errMessage";
import toast from "react-hot-toast";

function UploadBox({ title, onChange, error }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG or JPG allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    onChange({ file, preview: previewUrl });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-[#CDCECE] font-medium">{title}</p>

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`h-46 border border-dashed rounded-lg
        bg-[#1B1C1E] flex items-center justify-center text-sm flex-col gap-2.5 cursor-pointer
        ${error ? "border-red-500" : "border-[#2F3031]"}`}
      >
        <ImageUp className="text-accent-color-1" size={20} />
        <div className="text-g-200 text-center">
          <span className="text-accent-color-1">Upload a file</span> or drag and
          drop <br /> PNG, JPG up to 5MB
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/png,image/jpeg"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {error && <p className="text-dark-red text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Profile() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profileImage: null,
      bannerImage: null,
      gender: "Male",
    },
  });
  const [roleWithCompany, setRoleWithCompany] = useState("");
  const profileImage = watch("profileImage");
  const bannerImage = watch("bannerImage");

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.profileImage?.file) {
      formData.append("profileImage", data.profileImage.file);
    }

    if (data.bannerImage?.file) {
      formData.append("bannerImage", data.bannerImage.file);
    }

    formData.append("roleWithCompany", roleWithCompany);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);

    try {
      const { data: res } = await updateCompanyApi(data);
      toast.success("Company details updated successfully");
      console.log(res);
    } catch (error) {
      toast.error(getErrorMessage(error || "Failed to update company details"));
    }
  };

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
      isActive
        ? "bg-primary text-white border-primary"
        : "bg-g-600 text-g-200 border-g-500 hover:bg-g-700"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-10 flex flex-col gap-10"
    >
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <Controller
            name="profileImage"
            control={control}
            rules={{ required: "Profile picture is required" }}
            render={({ field }) => (
              <UploadBox
                title="Profile Picture"
                {...field}
                error={errors.profileImage?.message}
              />
            )}
          />

          {profileImage?.preview && (
            <Image
              src={profileImage.preview}
              height={64}
              width={64}
              alt="Profile"
              className="rounded-full h-16 w-16"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            name="bannerImage"
            control={control}
            rules={{ required: "Banner image is required" }}
            render={({ field }) => (
              <UploadBox
                title="Banner Image"
                {...field}
                error={errors.bannerImage?.message}
              />
            )}
          />

          {bannerImage?.preview && (
            <Image
              src={bannerImage.preview}
              height={116}
              width={450}
              alt="Banner"
              className="rounded-lg h-29 w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
        <Input
          label="First Name"
          placeholder="First name"
          {...register("firstName", {
            required: "First name is required",
          })}
          error={errors.firstName?.message}
        />

        <Input
          label="Last Name"
          placeholder="Last name"
          {...register("lastName", {
            required: "Last name is required",
          })}
          error={errors.lastName?.message}
        />

        <div>
          <SelectField
            label="Role within the company"
            name="roleWithCompany"
            placeholder="Search"
            options={["FOUNDER", "CEO", "HR_MANAGER"]}
            onChange={(role) => setRoleWithCompany(role)}
          />
          {roleWithCompany && (
            <button className={`${pillClass()} mt-4 capitalize`}>
              {roleWithCompany.toLowerCase()}
            </button>
          )}
        </div>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              <p className="text-[#CDCECE] font-medium">Gender</p>

              <div className="flex gap-2.5">
                {["Male", "Female", "Prefer not to say"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => field.onChange(g)}
                    className={`px-4 py-2 rounded-full border text-sm cursor-pointer
                    ${
                      field.value === g
                        ? "border-primary text-[#E6E6E6]"
                        : "border-[#434345] text-[#9C9C9D]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex justify-end">
        <SaveButton type="submit" />
      </div>
    </form>
  );
}
