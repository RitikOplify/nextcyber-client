import Footer from "@/components/Footer";
import NextCyberLanding from "@/components/home/Section1";
import CybersecurityJobBoard from "@/components/home/Section2";
import ClientReviewsSection from "@/components/home/Section3";
import FAQSection from "@/components/home/Section4";
import Nav from "@/components/Nav";
import React from "react";

function HomePage() {
  return (
    <>
      <Nav />
      <NextCyberLanding />
      <CybersecurityJobBoard />
      <ClientReviewsSection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default HomePage;
