'use client'
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { usePathname } from "next/navigation";
import React from "react";

function Wrapper({ children }) {
  const pathname = usePathname();

  const authPages = ["/auth"];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) return children;

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export default Wrapper;
