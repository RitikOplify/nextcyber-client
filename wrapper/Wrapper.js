"use client";
import React from "react";
import Nav from "@/components/Navigation/Nav";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

function Wrapper({ children }) {
  const pathname = usePathname();
  const authPages = ["/auth"];
  const isAuthPage = authPages.includes(pathname);
  if (isAuthPage) return children;

  if (pathname === "/") {
    return (
      <>
        <Nav />
        {children}
        <Footer />
      </>
    );
  }

  return <>{children}</>;
}

export default Wrapper;
