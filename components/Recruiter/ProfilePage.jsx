"use client";

import { useState } from "react";
import CompanyDetails from "./forms/CompanyDetails";
import Profile from "./forms/Profile";
import NextCybrProfile from "./forms/NextCybrProfile";
import ProfileTabs from "./ProfileTabs";

export default function RecruiterProfilePage() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="min-h-screen ">
      <ProfileTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "company" && <CompanyDetails />}
      {activeTab === "profile" && <Profile />}
      {activeTab === "nextcybr" && <NextCybrProfile />}
    </div>
  );
}
