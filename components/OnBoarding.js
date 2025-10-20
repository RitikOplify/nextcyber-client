import React from "react";
import StudentOnBoarding from "./OnBoarding/StudentOnboarding";
import { useSelector } from "react-redux";
import RecruiterOnBoarding from "./OnBoarding/RecruiterOnBoarding";

function OnBoarding() {
  const { user } = useSelector((state) => state.auth);
  if (user.role == "candidate") return <StudentOnBoarding />;
  return <RecruiterOnBoarding />;
}

export default OnBoarding;
