import ClientReviewsSection from "@/components/home/Section3";
import FAQSection from "@/components/home/Section4";
import Section2 from "@/components/JobSeeker/Section2";
import Section1 from "@/components/Recruiter/Section1";
import Section3 from "@/components/Recruiter/Section3";
import React from "react";

function RecruiterPage() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}

export default RecruiterPage;
