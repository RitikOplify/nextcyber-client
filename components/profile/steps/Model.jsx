"use client";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-g-500/50 backdrop-blur-[1px] inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="rounded-[10px] p-0.5 bg-gradient-to-r from-[#2F3031] to-[#1B1C1E] w-3xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`bg-g-700 rounded-lg z-10 w-full p-7.5`}>
          <div className="flex items-start justify-between">
            <h3 className="text-xl leading-6 font-semibold text-g-100">{title}</h3>
            <button
              onClick={onClose}
              className="text-g-200 cursor-pointer hover:text-dark-red"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
