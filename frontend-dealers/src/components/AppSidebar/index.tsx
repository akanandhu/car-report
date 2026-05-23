"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CarIcon, LayoutDashboardIcon, FilePen, LayoutTemplate, Settings, X } from "lucide-react";

type SidebarItem = {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: ReactNode;
};

type AppSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    match: (pathname) => pathname === "/dashboard",
    icon: <LayoutDashboardIcon width={18} height={18} />,
  },
  {
    label: "All Cars",
    href: "/all-cars",
    match: (pathname) => pathname.startsWith("/all-cars"),
    icon: <CarIcon width={18} height={18} />,
  },
  {
    label: "Drafts",
    href: "/drafts",
    match: (pathname) => pathname.startsWith("/drafts"),
    icon: <FilePen width={18} height={18} />,
  },
  {
    label: "Design Template",
    href: "/design-template",
    match: (pathname) => pathname.startsWith("/design-template"),
    icon: <LayoutTemplate width={18} height={18} />,
  },
];

const AppSidebar = ({ isOpen = false, onClose }: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop — mobile only, shown when drawer is open */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out
          md:static md:z-auto md:w-64 md:h-screen md:shrink-0 md:self-start md:translate-x-0 md:transition-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo row */}
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-950">
            <CarIcon />
          </div>
          <p className="text-[18px] font-bold tracking-[-0.03em] text-[#081a43]">
            CarEval Pro
          </p>
          {/* Close button — mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex items-center justify-center rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 md:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
          {sidebarItems.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                  isActive
                    ? "bg-black/10 text-[#081a43]"
                    : "text-[#405472] hover:bg-slate-50 hover:text-[#081a43]"
                }`}
              >
                <span className={isActive ? "text-[#081a43]" : "text-[#5f7190]"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-slate-200 px-2 py-1">
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-[15px] font-semibold transition-colors ${
              pathname.startsWith("/settings")
                ? "bg-slate-100 text-[#081a43]"
                : "text-[#405472] hover:bg-slate-50 hover:text-[#081a43]"
            }`}
          >
            <span className={pathname.startsWith("/settings") ? "text-[#081a43]" : "text-[#5f7190]"}>
              <Settings width={18} height={18} />
            </span>
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
