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
        <label className="block text-sm mb-1">Job Description</label>
        <div className="border border-gray-700 rounded bg-gray-900">
          <div className="px-3 py-2 flex gap-2 border-b border-gray-800">
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
            placeholder="Enter job description..."
            className="w-full p-4 h-48 bg-transparent text-gray-100 border-0 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">Attachments</label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 rounded bg-gray-800 border border-gray-700">
            <Upload size={16} />
            <input type="file" className="hidden" onChange={handleFile} />
            <span className="ml-2 text-sm">Upload</span>
          </label>

          <div className="flex gap-2 flex-wrap">
            {attachments.map((f, i) => (
              <div
                key={i}
                className="px-3 py-1 bg-gray-800 rounded flex items-center gap-2 border border-gray-700"
              >
                <span className="text-sm truncate max-w-[160px]">{f.name}</span>
                <button
                  onClick={() => remove(i)}
                  className="p-1 rounded hover:bg-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
