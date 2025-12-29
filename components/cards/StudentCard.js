import React from "react";
import { MessageCircleMore, ArrowUpRight, Heart, Clock, Wallet } from 'lucide-react';

const StudentCard = ({ candidate, index, favorites, toggleFavorite }) => {
  return (
    <>
      <div
        key={candidate.id}
        className="bg-g-600 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all"
      >
        {/* Header with Avatar and Heart */}
        <div className="flex justify-between items-start mb-4">
          <img
            src={candidate?.profilePicture?.url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
            alt={candidate.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <button
            onClick={() => toggleFavorite(index)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              favorites.includes(index)
                ? "bg-purple-500/20 text-purple-400"
                : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.includes(index) ? "fill-primary-2-light" : ""
              }`}
            />
          </button>
        </div>

        {/* Name and Role */}
        <h3 className="text-g-200 font-semibold text-lg mb-1">
          {candidate.user.firstName} {candidate.user.lastName}
        </h3>
        <p className="text-g-300 text-sm mb-4">{candidate.role || candidate?.user?.email}</p>

        {/* Salary and Experience */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-gray-400 bg-g-500 text-sm py-0.5 px-1 rounded-sm">
            <Wallet className="w-4 h-4" />
            <span>{ candidate?.contractType === "FREELANCE" ? (candidate?.hourlyRate || 'N/A') : (candidate.salary || 'N/A')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-g-200 bg-g-500 text-sm py-0.5 px-2 rounded-sm">
            <Clock className="w-4 h-4" />
            <span>{candidate.totalExperienceYears}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
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
