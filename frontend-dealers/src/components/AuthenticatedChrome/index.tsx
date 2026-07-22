"use client";

import AppSidebar from "@/src/components/AppSidebar";

import Navbar from "@/src/components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { getAuthenticatedChromeVisibility } from "./utils";
import { useSession } from "next-auth/react";
import { Capacitor } from "@capacitor/core";

const AuthenticatedChrome = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showNavbar, showSidebar } =
    getAuthenticatedChromeVisibility(pathname);

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    const isNative = platform === "android" || platform === "ios";

    if (isNative) {
      const localToken = localStorage.getItem("accessToken");
      if (!localToken) {
        router.push("/auth");
      }
    } else if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-500">Loading session...</p>
      </div>
    );
  }


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
