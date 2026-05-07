"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SidebarItem = {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: ReactNode;
};

const DashboardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M5 16.5h14" />
    <path d="M7 16.5v1.5" />
    <path d="M17 16.5v1.5" />
    <path d="M3 13.5v-2.3a2 2 0 0 1 1.23-1.85l1.47-.62L7.4 6.3A2 2 0 0 1 9.25 5h5.5a2 2 0 0 1 1.85 1.3l1.7 2.43 1.47.62A2 2 0 0 1 21 11.2v2.3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <circle cx="7.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const DraftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Z" />
    <path d="M14 3v4h4" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

const TemplateIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="8" height="7" rx="1.5" />
    <rect x="13" y="14" width="8" height="7" rx="1.5" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1V9c0 .4.2.8.6.9h.2a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
  </svg>
);

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    match: (pathname) => pathname === "/" || pathname === "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "All Cars",
    href: "/all-cars",
    match: (pathname) => pathname.startsWith("/all-cars"),
    icon: <CarIcon />,
  },
  {
    label: "Drafts",
    href: "/drafts",
    match: (pathname) => pathname.startsWith("/drafts"),
    icon: <DraftIcon />,
  },
  {
    label: "Design Template",
    href: "/design-template",
    match: (pathname) => pathname.startsWith("/design-template"),
    icon: <TemplateIcon />,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:fixed md:inset-y-0 md:left-0 md:h-screen md:w-[280px] md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 border-b border-slate-200 px-8 py-6 h-16">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-950">
          <CarIcon />
        </div>
        <div>
          <p className="text-[18px] font-semibold tracking-[-0.03em] text-[#081a43]">
            CarEval Pro
          </p>
        </div>
      </div>
      <nav className="hide-scrollbar flex gap-2 overflow-x-auto px-4 py-6 md:flex-1 md:flex-col md:overflow-y-auto md:overflow-x-visible md:px-5 md:py-7">
        {sidebarItems.map((item) => {
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-max items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium transition-colors md:min-w-0 ${
                isActive
                  ? "bg-slate-100 text-[#081a43]"
                  : "text-[#405472] hover:bg-slate-50 hover:text-[#081a43]"
              }`}
            >
              <span className={isActive ? "text-[#081a43]" : "text-[#5f7190]"}>
                {item.icon}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-5 py-5">
        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-[15px] font-medium transition-colors ${
            pathname.startsWith("/settings")
              ? "bg-slate-100 text-[#081a43]"
              : "text-[#405472] hover:bg-slate-50 hover:text-[#081a43]"
          }`}
        >
          <span className={pathname.startsWith("/settings") ? "text-[#081a43]" : "text-[#5f7190]"}>
            <SettingsIcon />
          </span>
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default AppSidebar;
