"use client";
import InDev from "@/components/InDev";
import RecruiterProfilePage from "@/components/Recruiter/ProfilePage";
import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  if (user.role == "COMPANY") return <RecruiterProfilePage />;
  return <InDev />;
}

export default ProfilePage;
