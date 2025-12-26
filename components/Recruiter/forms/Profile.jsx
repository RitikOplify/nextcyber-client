"use client";
import { Input } from "@/components/ui/Input";
import { SaveButton } from "@/components/ui/SaveButton";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

function UploadBox({ title, onChange }) {
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

    onChange?.({ file, preview: previewUrl });
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
        className="h-46 border border-dashed border-[#2F3031] rounded-lg
        bg-[#1B1C1E] flex items-center justify-center text-sm flex-col gap-2.5 cursor-pointer"
      >
        <ImageUp className=" text-accent-color-1" size={20} />
        <div className=" text-g-200 text-center">
          <span className=" text-accent-color-1">Upload a file</span> or drag
          and drop <br /> PNG, JPG up to 5MB
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/png,image/jpeg"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleSave = () => {
    const formData = new FormData();
    if (profileImage) formData.append("profileImage", profileImage);
    if (bannerImage) formData.append("bannerImage", bannerImage);

    console.log("Uploading:", profileImage, bannerImage);
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <UploadBox title="Profile Picture" onChange={setProfileImage} />

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
          <UploadBox title="Banner Image" onChange={setBannerImage} />

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
        <Input label="First Name" placeholder="First name" />
        <Input label="Last Name" placeholder="Last name" />
        <Input label="Role within the Company" placeholder="Select role" />
        <div className="flex flex-col gap-4">
          <p className="text-[#CDCECE] font-medium">Gender</p>
          <div className="flex gap-2.5">
            {["Male", "Female", "Prefer not to say"].map((g) => (
              <button
                key={g}
                className={`px-4 py-2 rounded-full border text-sm
              ${
                g === "Male"
                  ? "border-primary text-[#E6E6E6]"
                  : "border-[#434345] text-[#9C9C9D]"
              }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}
