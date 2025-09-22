import NextCyberLanding from "@/components/home/Section1";
import CybersecurityJobBoard from "@/components/home/Section2";
import ClientReviewsSection from "@/components/home/Section3";
import FAQSection from "@/components/home/Section4";
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
