"use client";
import Sidebar from "@/components/Navigation/SideBar";
import { asyncCurrentUser } from "@/store/actions/authActions";
import { Bell, ChevronRight, Loader2, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProtectedLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.auth);
  const labelMap = {
    dashboard: "Dashboard",
    products: "Products",
    categories: "Categories",
    users: "Users",
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const segments = pathname.split("/").filter(Boolean);

  function isUUID(segment) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      segment
    );
  }

  // Filter segments to exclude UUIDs when there are routes after them
  const filteredSegments = [];
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    // If current segment is UUID and there are more segments after it, skip it
    if (isUUID(segment) && i + 1 < segments.length) {
      continue;
    }

    filteredSegments.push(segment);
  }

  const breadcrumbs = [];
  let hrefIndex = 0; // Track actual position in original segments for href construction

  for (let i = 0; i < filteredSegments.length; i++) {
    const segment = filteredSegments[i];

    // Find the actual position of this segment in the original segments array
    while (hrefIndex < segments.length && segments[hrefIndex] !== segment) {
      hrefIndex++;
    }

    const href = "/" + segments.slice(0, hrefIndex + 1).join("/");

    const label = isUUID(segment)
      ? "Details"
      : labelMap[segment.toLowerCase()] || decodeURIComponent(segment);

    breadcrumbs.push({ href, label });
    hrefIndex++;
  }

  useEffect(() => {
    if (user === null) {
      dispatch(asyncCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "candidate" && !user.onboarding) {
        router.replace(`/onboarding/${user.id}`);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className=" animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-g-900">
      <Sidebar isMobileOpen={isMobileOpen} toggleMobile={toggleMobile} />
      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        <div className="sticky top-0 z-20 bg-g-800">
          <div className="lg:hidden  flex items-center justify-between border-b border-g-500 py-3 px-5">
            <button
              onClick={toggleMobile}
              className="text-heading hover:bg-background rounded-lg transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={25} />
            </button>
            <div className="flex lg:hidden items-center space-x-4">
              <button className="relative bg-g-400/50 transition-colors p-2 rounded-full cursor-pointer bg-g-4000 hover:bg-g-500">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="w-9 h-9 bg-g-500 rounded-full flex items-center justify-center">
                <Image
                  src={user.profilePicture.url}
                  height={36}
                  width={36}
                  alt="profile"
                  className=" rounded-full"
                />
              </div>
            </div>
          </div>
          <div className=" hidden text-[13px] lg:flex items-center font-normal justify-between text-text-secondary py-3 px-5 border-b border-g-500">
            <div className="flex items-center">
              {pathname !== "/dashboard" && (
                <Link
                  href="/dashboard"
                  className="text-text-secondary hover:text-text transition-colors"
                >
                  Dashboard
                </Link>
              )}
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={crumb.href}>
                  {pathname !== "/dashboard" && (
                    <span className="mx-1 text-text">
                      <ChevronRight size={14} />
                    </span>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-heading capitalize">
                      {crumb.label.replaceAll("-", " ")}
                    </span>
                  ) : (
                    <Link href={crumb.href}>
                      <span className="hover:underline capitalize text-text-secondary hover:text-text transition-colors">
                        {crumb.label.replaceAll("-", " ")}
                      </span>
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative bg-g-400/50 transition-colors p-2 rounded-full cursor-pointer bg-g-4000 hover:bg-g-500">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="w-9 h-9 bg-g-500 rounded-full flex items-center justify-center">
                <Image
                  src={user.profilePicture.url}
                  height={36}
                  width={36}
                  alt="profile"
                  className=" rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="p-5 bg-background max-h-[calc(100vh-60.84px)] flex-1 overflow-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProtectedLayout;
