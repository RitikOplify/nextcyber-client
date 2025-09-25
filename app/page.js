import NextCyberLanding from "@/components/Home/Section1";
import CybersecurityJobBoard from "@/components/Home/Section2";
import ClientReviewsSection from "@/components/Home/Section3";
import FAQSection from "@/components/Home/Section4";
import React from "react";

function HomePage() {
  return (
    <>
      <NextCyberLanding />
      <CybersecurityJobBoard />
      <ClientReviewsSection />
      <FAQSection />
    </>
  );
}

export default HomePage;
