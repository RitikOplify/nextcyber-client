"use client";
import React, { useEffect } from "react";
import Nav from "@/components/Navigation/Nav";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { asyncCurrentUser } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function Wrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const authPages = [
    "/auth",
    "/",
    "/privacy-policy",
    "/terms-and-conditions",
    "/forgot-password",
  ];
  const dynamicAuthPages = ["/reset-password/"];
  const NavPages = ["/", "/privacy-policy", "/terms-and-conditions"];
  const isNavPage = NavPages.includes(pathname);

  const isAuthPage =
    authPages.includes(pathname) ||
    dynamicAuthPages.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (user === null && !isAuthPage) {
      dispatch(asyncCurrentUser());
    }
  }, [dispatch, user, isAuthPage]);

  useEffect(() => {
    if (!isLoading && user === null && !isAuthPage) {
      router.replace("/auth");
    }
  }, [user, isLoading, router, isAuthPage]);

  useEffect(() => {
    if (!isLoading && user && isAuthPage) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isLoading && user) {
      if (!user.onboarding) {
        router.replace(`/onboarding/${user.id}`);
      }
    }
  }, [user, isLoading, router]);

  if (!isAuthPage && (isLoading || user === null)) {
    return <>{children}</>;
  }

  if (isNavPage) {
    return (
      <>
        <Nav />
        {children}
        <Footer />
      </>
    );
  }
  if (isAuthPage) return children;

  return <>{children}</>;
}

export default Wrapper;
