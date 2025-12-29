"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { SaveButton } from "@/components/ui/SaveButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { updateCompanyApi } from "@/api/companyApi";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/errMessage";

export default function CompanyDetails() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { companyProfile } = useSelector((state) => state.auth.user);
  console.log(companyProfile.socialLinks);

  useEffect(() => {
    if (!companyProfile) return;

    const socialMap = {};
    companyProfile.socialLinks?.forEach((item) => {
      socialMap[item.platform.toLowerCase()] = item.url;
    });

    reset({
      companyName: companyProfile.companyName || "",
      companyEmail: companyProfile.companyEmail || "",
      companyWebsiteLink: companyProfile.companyWebsiteLink || "",
      headquarter: companyProfile.headquarter || "",
      founded: companyProfile.founded || "",
      companySize: companyProfile.companySize || "",
      industry: companyProfile.industry || "",

      facebook: socialMap.facebook || "",
      linkedin: socialMap.linkedin || "",
      x: socialMap.twitter || "",
      instagram: socialMap.instagram || "",
      glassdoor: socialMap.glassdoor || "",
    });
  }, [companyProfile, reset]);

  const onSubmit = async (data) => {
    try {
      const socialLinks = [
        data.facebook && { platform: "Facebook", url: data.facebook },
        data.linkedin && { platform: "LinkedIn", url: data.linkedin },
        data.x && { platform: "Twitter", url: data.x },
        data.instagram && { platform: "Instagram", url: data.instagram },
        data.glassdoor && { platform: "Glassdoor", url: data.glassdoor },
      ].filter(Boolean);

      const payload = {
        ...data,
        socialLinks,
      };

      delete payload.facebook;
      delete payload.linkedin;
      delete payload.x;
      delete payload.instagram;
      delete payload.glassdoor;
      console.log(payload);

      const { data: res } = await updateCompanyApi(payload);
      toast.success("Company details updated successfully");
      console.log(res);
    } catch (error) {
      toast.error(getErrorMessage(error || "Failed to update company details"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-10 flex flex-col gap-y-10"
    >
      <div>
        <h2 className="text-xl font-semibold text-g-100 leading-6 mb-7.5">
          General
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
          <Input
            label="Company Name"
            placeholder="Enter company name"
            {...register("companyName", {
              required: "Company name is required",
            })}
            error={errors.companyName?.message}
          />

          <Input
            label="Company Email"
            placeholder="Enter company email"
            {...register("companyEmail", {
              required: "Company email is required",
            })}
            error={errors.companyEmail?.message}
          />

          <Input
            label="Company Website Link"
            placeholder="Enter website link"
            {...register("companyWebsiteLink")}
            error={errors.website?.message}
          />

          <Input
            label="Headquarters"
            placeholder="Enter location"
            {...register("headquarter")}
            error={errors.headquarters?.message}
          />

          <Input
            label="Founded"
            placeholder="Year"
            {...register("founded")}
            error={errors.founded?.message}
          />

          <Input
            label="Company Size"
            placeholder="Select your company size"
            {...register("companySize")}
            error={errors.companySize?.message}
          />

          <Input
            label="Industry"
            placeholder="Industry"
            {...register("industry")}
            error={errors.industry?.message}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-g-100 leading-6 mb-7.5">
          Social
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
          <Input
            label="Facebook URL"
            placeholder="Enter Facebook URL"
            {...register("facebook")}
            error={errors.facebook?.message}
          />

          <Input
            label="LinkedIn URL"
            placeholder="Enter LinkedIn URL"
            {...register("linkedin")}
            error={errors.linkedin?.message}
          />

          <Input
            label="X URL"
            placeholder="Enter X URL"
            {...register("x")}
            error={errors.x?.message}
          />

          <Input
            label="Instagram URL"
            placeholder="Enter Instagram URL"
            {...register("instagram")}
            error={errors.instagram?.message}
          />

          <Input
            label="Glassdoor URL"
            placeholder="Enter Glassdoor URL"
            {...register("glassdoor")}
            error={errors.glassdoor?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton type="submit" />
      </div>
    </form>
  );
}
