"use client";

import AppSidebar from "@/src/components/AppSidebar";
import Navbar from "@/src/components/Navbar";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getAuthenticatedChromeVisibility } from "./utils";

const AuthenticatedChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { showNavbar, showSidebar } =
    getAuthenticatedChromeVisibility(pathname);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      {showSidebar ? <AppSidebar /> : null}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {showNavbar ? <Navbar /> : null}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedChrome;
