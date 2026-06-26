"use client";

import AppSidebar from "@/src/components/AppSidebar";
import Navbar from "@/src/components/Navbar";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { getAuthenticatedChromeVisibility } from "./utils";

const AuthenticatedChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showNavbar, showSidebar } =
    getAuthenticatedChromeVisibility(pathname);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      {showSidebar ? (
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : null}
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col ${
          showSidebar ? "md:pl-64" : ""
        } ${
          showNavbar
            ? "pt-29.5 md:pt-16"
            : ""
        }`}
      >
        {showNavbar ? (
          <Navbar
            hasSidebar={showSidebar}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
        ) : null}
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedChrome;
