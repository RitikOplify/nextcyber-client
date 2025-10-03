"use client";
import { useState } from "react";
import {
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Handshake,
  Trophy,
  Briefcase,
  Building2,
  HelpCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { asyncSignOutUser } from "@/store/actions/authActions";

export default function Sidebar({ isMobileOpen, toggleMobile }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "My NextGen CV",
      icon: FileText,
      href: "",
    },
    {
      label: "Training & Certifications",
      icon: GraduationCap,
      href: "",
    },
    {
      label: "Mentorship",
      icon: Handshake,
      href: "",
    },
    {
      label: "Challenges",
      icon: Trophy,
      href: "",
    },
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/jobs",
    },
    {
      label: "Companies",
      icon: Building2,
      href: "/companies",
    },
  ];

  const bottomNavItem = [
    {
      label: "Support & Help",
      icon: HelpCircle,
      href: "",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "",
    },
  ];

  const handleLogout = async () => {
    dispatch(asyncSignOutUser());
  };

  const SidebarNavLinks = ({ items, collapsed }) => (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;
        const IconComponent = item.icon;

        if (item.children) {
          const isOpen = openGroups[item.label] || false;
          return (
            <div key={item.label} className="w-full">
              <button
                onClick={() => toggleGroup(item.label)}
                title={collapsed ? item.label : ""}
                className={clsx(
                  "flex items-center py-4 pr-2.5 pl-6 cursor-pointer gap-4 w-full transition-colors font-medium text-heading-secondary",
                  isOpen ? "bg-background" : "hover:bg-background"
                )}
              >
                <IconComponent size={20} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed &&
                  (isOpen ? (
                    <ChevronDown className="ml-auto" size={20} />
                  ) : (
                    <ChevronRight className="ml-auto" size={20} />
                  ))}
              </button>

              {isOpen && !collapsed && (
                <div className=" pl-5.5 mt-1 flex flex-col">
                  <SidebarNavLinks items={item.children} collapsed={false} />
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            title={collapsed ? item.label : ""}
            className={clsx(
              "flex items-center py-4 pr-2.5 pl-6 gap-4 whitespace-nowrap transition-colors font-semibold text-sm leading-[150%] text-g-100 hover:bg-g-600",
              isActive
                ? "bg-gradient-to-r  from-g-500 to-primary"
                : "hover:bg-background"
            )}
          >
            <IconComponent
              size={20}
              className={isActive ? "text-primary" : ""}
            />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex min-h-screen sticky top-0 z-30 ">
        <div
          className={clsx(
            "bg-g-800 text-heading-secondary text-sm font-medium h-full flex flex-col justify-between transition-all duration-300",
            isCollapsed ? "w-20 items-start" : "w-60"
          )}
        >
          <div
            className={`flex min-h-[60.67px] ${
              !isCollapsed ? "justify-between" : "justify-center"
            } items-center py-4 pr-2.5 w-full border-b border-g-500 sticky top-0 bg-g-800 z-30`}
          >
            {!isCollapsed && (
              <Link href={"/dashboard"}>
                <Image
                  src="/logo.png"
                  className=" h-7 w-auto pl-6"
                  height={72}
                  width={329}
                  alt="nextcybr-logo"
                />
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className=" cursor-pointer"
            >
              {isCollapsed ? (
                <PanelLeftOpen size={22} />
              ) : (
                <PanelLeftClose size={22} />
              )}
            </button>
          </div>

          <div className="flex-grow scrollbar overflow-y-auto overflow-x-hidden flex flex-col w-full bg-g-800 border-r border-g-500">
            <SidebarNavLinks items={navItems} collapsed={isCollapsed} />
          </div>

          <div className="border-g-500 w-full bg-g-800 border-r">
            <SidebarNavLinks items={bottomNavItem} collapsed={isCollapsed} />

            <button
              onClick={handleLogout}
              className={clsx(
                "flex items-center cursor-pointer py-4 pr-2.5 pl-6 gap-4 w-full transition-colors font-semibold text-sm leading-[150%] text-g-100 hover:bg-g-600"
              )}
            >
              <LogOut size={20} />
              {!isCollapsed && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed h-screen inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-white/2.5 backdrop-blur-[2px]"
            onClick={toggleMobile}
          />
          <div className="relative z-50 bg-g-800 flex flex-col w-60">
            <div className="flex justify-between items-center bg-g-800 pl-6 pr-2.5 h-[60.67px] w-full sticky top-0 border-b border-g-500">
              <Link href={"/dashboard"}>
                <Image
                  src="/logo.png"
                  className=" h-7 w-auto"
                  height={72}
                  width={329}
                  alt="nextcybr-logo"
                />
              </Link>
              <button
                onClick={toggleMobile}
                className=" text-white cursor-pointer hover:text-red-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className=" flex-1 overflow-y-auto flex flex-col justify-between overflow-x-hidden">
              <div className="flex flex-col flex-grow bg-g-800">
                <SidebarNavLinks items={navItems} collapsed={false} />
                <SidebarNavLinks items={bottomNavItem} collapsed={false} />

                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobile();
                  }}
                  className={clsx(
                    "flex items-center cursor-pointer py-4 pr-2.5 pl-6 gap-4 w-full transition-colors font-semibold text-sm leading-[150%] text-g-100 hover:bg-g-600"
                  )}
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
