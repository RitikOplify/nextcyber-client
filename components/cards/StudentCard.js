import React from "react";
import {
  MessageCircleMore,
  ArrowUpRight,
  Heart,
  Clock,
  Wallet,
} from "lucide-react";
import { currencyFormatter } from "@/helper";
<<<<<<< Updated upstream
import Image from "next/image";
=======
>>>>>>> Stashed changes

const StudentCard = ({
  candidate,
  index,
  className,
  style,
  handleFavoriteToggle,
  isFavorite,
}) => {
  return (
    <>
      <div
        key={candidate.id}
<<<<<<< Updated upstream
        className={`flex flex-col justify-between bg-g-600 border border-g-800 rounded-xl p-5 hover:border-g-400 transition-all ${className}`}
        style={style}
      >
        <div className="mb-4">
          <div className="flex justify-between items-start mb-4">
            <Image
=======
        className={`flex flex-col justify-between bg-g-600 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all ${className}`}
        style={style}
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <img
>>>>>>> Stashed changes
              src={
                candidate?.profilePicture?.url ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              }
<<<<<<< Updated upstream
              alt={candidate.user.firstName + " " + candidate.user.lastName}
              className="w-14 h-14 rounded-full object-cover"
              width={56}
              height={56}
              onLoad={(event) => {
                event.target.style.opacity = 1;
              }}
              style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
=======
              alt={candidate.name}
              className="w-14 h-14 rounded-full object-cover"
>>>>>>> Stashed changes
            />
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isFavorite
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-primary-2-light" : ""
                }`}
              />
            </button>
          </div>

          <h3 className="text-g-200 font-semibold text-lg mb-1">
            {candidate.user.firstName} {candidate.user.lastName}
          </h3>
          <p className="text-g-300 text-sm mb-4 break-words">
            {candidate.role || candidate?.user?.email}
          </p>

<<<<<<< Updated upstream
          <div className="flex flex-wrap items-center gap-4 mb-6">
=======
          <div className="flex items-center gap-4 mb-6">
>>>>>>> Stashed changes
            <div className="flex items-center gap-1.5 text-gray-400 bg-g-500 text-sm py-0.5 px-1 rounded-sm">
              <Wallet className="w-4 h-4" />
              <span>
                {candidate?.contractType === "FREELANCE"
                  ? currencyFormatter(candidate?.hourlyRate) || "0"
<<<<<<< Updated upstream
                  : currencyFormatter(candidate?.expectedSalary) || "0"}
=======
                  : currencyFormatter(candidate?.salary) || "0"}
>>>>>>> Stashed changes
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-g-200 bg-g-500 text-sm py-0.5 px-2 rounded-sm">
              <Clock className="w-4 h-4" />
<<<<<<< Updated upstream
              <span>{candidate.workExperienceInYears}</span>
=======
              <span>{candidate.totalExperienceYears}</span>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
        <div className="flex flex-wrap gap-3">
=======
        <div className="flex gap-3">
>>>>>>> Stashed changes
          <button className="flex-1 flex items-center justify-center gap-2 border border-g-500 hover:bg-primary text-gray-300 py-2.5 rounded-lg transition-colors cursor-pointer">
            <MessageCircleMore className="w-4 h-4" />
            <span className="text-sm">Chat</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-g-500 hover:bg-primary text-gray-300 py-2.5 rounded-lg transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
