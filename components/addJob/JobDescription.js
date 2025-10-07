"use client";

import React from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  FileText,
  Paperclip,
  Upload,
  X,
} from "lucide-react";

export default function JobDescription({ form, attachments, setAttachments }) {
  const { register } = form;

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      alert("File must be < 10MB");
      return;
    }
    setAttachments((p) => [...p, f]);
  };

  const remove = (idx) => setAttachments((p) => p.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-4 text-base leading-6 font-medium text-g-200">
          Job Description
        </label>
        <div className="border px-4 py-5 border-g-600 rounded-lg bg-g-700">
          <div className=" flex gap-2 border-b pb-5 border-g-600">
            <button type="button" title="Bold">
              <Bold size={16} />
            </button>
            <button type="button" title="Italic">
              <Italic size={16} />
            </button>
            <button type="button" title="Underline">
              <Underline size={16} />
            </button>
            <button type="button" title="List">
              <List size={16} />
            </button>
            <button type="button" title="Align Left">
              <AlignLeft size={16} />
            </button>
            <button type="button" title="Align Center">
              <AlignCenter size={16} />
            </button>
            <button type="button" title="Align Right">
              <AlignRight size={16} />
            </button>
            <button type="button" title="Link">
              <Link size={16} />
            </button>
            <button type="button" title="Image">
              <Image size={16} />
            </button>
            <button type="button" title="File">
              <FileText size={16} />
            </button>
            <button type="button" title="Attach">
              <Paperclip size={16} />
            </button>
          </div>

          <textarea
            {...register("jobDescription", {
              maxLength: { value: 4000, message: "Too long" },
            })}
            placeholder="Enter Text Here..."
            className="w-full pt-5 h-48 bg-transparent text-gray-100 border-0 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
