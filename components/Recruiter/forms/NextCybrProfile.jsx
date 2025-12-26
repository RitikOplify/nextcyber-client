"use client";

import QuillEditor from "@/components/QuillEditor";
import { Input } from "@/components/ui/Input";
import { SaveButton } from "@/components/ui/SaveButton";
import { useState } from "react";

export default function NextCybrProfile() {
  const [about, setAbout] = useState("");

  return (
    <div className="max-w-5xl mx-auto mt-10 flex flex-col gap-10">
      <Input label="Company Tagline" placeholder="Enter company tagline" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-g-200">About Company</label>

        <QuillEditor
          onChange={(val) => {
            setAbout(val);
          }}
          value={about}
        />
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}
