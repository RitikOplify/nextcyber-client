"use client";
import React, { useEffect } from "react";
import Nav from "@/components/Navigation/Nav";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { asyncCurrentUser } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

function Wrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const authPages = ["/auth", "/"];
  const isAuthPage = authPages.includes(pathname);
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

  if (!isAuthPage && (isLoading || user === null)) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className=" animate-spin" />
      </div>
    );
  }

  if (pathname === "/") {
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
