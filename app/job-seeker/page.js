import ClientReviewsSection from "@/components/home/Section3";
import FAQSection from "@/components/home/Section4";
import Section1 from "@/components/JobSeeker/Section";
import Section2 from "@/components/JobSeeker/Section2";
import Section3 from "@/components/JobSeeker/Section3";
import React from "react";

function JobSeekerPage() {
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

export default JobSeekerPage;
