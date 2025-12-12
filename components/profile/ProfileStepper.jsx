"use client";
import React from "react";

export default function Stepper({ step = 0 }) {
  const steps = ["Account Details", "Profile", "Technical"];
  return (
    <div className="w-full mx-auto relative">
      <div
        className="absolute top-4 left-0 w-full h-[2px] z-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(156,156,157,0) 0%, #9C9C9D 50%, rgba(156,156,157,0) 100%)",
        }}
      />

      <div className="flex items-center justify-between w-full relative z-10 max-w-2xl mx-auto">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center relative z-20"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                i <= step
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-900 border-gray-600 text-gray-400"
              }`}
            >
              {i <= step ? "✔" : i + 1}
            </div>

            <div
              className={`text-xs ${
                i <= step ? "text-white" : "text-gray-500"
              }`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
