"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {CarIcon, LayoutDashboardIcon, FilePen, LayoutTemplate, Settings } from "lucide-react"
import { SidebarItemI } from "./types";


const sidebarItems: SidebarItemI[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon width={18} height={18} />,
  },
  {
    label: "All Cars",
    href: "/all-cars",
    icon: <CarIcon width={18} height={18}  />,
  },
  {
    label: "Drafts",
    href: "/drafts",
    icon: <FilePen width={18} height={18}  />,
  },
  {
    label: "Design Template",
    href: "/design-template",
    icon: <LayoutTemplate width={18} height={18}  />,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-64 md:self-start md:border-b-0 md:border-r">
      <div className="flex items-center border-b border-slate-200 px-8 py-6 h-16">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl   text-slate-950">
          <CarIcon />
        </div>
          <p className="text-[18px] font-bold tracking-[-0.03em] text-[#081a43]">
            CarEval Pro
          </p>
  
      </div>
      <nav className="hide-scrollbar flex gap-2 overflow-x-auto px-4 py-6 md:flex-1 md:flex-col md:overflow-y-auto md:overflow-x-visible md:px-5 md:py-7">
        {sidebarItems.map((item) => {
          const isActive = pathname.includes(item.href)

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-max items-center gap-3 rounded-lg px-4 py-2.5 text-[14px] font-semibold transition-colors md:min-w-0 ${
                isActive
                  ? "bg-black/10 text-[#081a43]"
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

      <div className="border-t border-slate-200 py-1 px-2">
        <Link
          href="/settings"
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
  );
};

export default AppSidebar;
