"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CarIcon,
  FilePen,
  LayoutDashboardIcon,
  LayoutTemplate,
  Settings,
  X,
} from "lucide-react";
import { SidebarItemI } from "./types";

type AppSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

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

const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[1px] transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,86vw)] shrink-0 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 md:w-[calc(16rem+env(safe-area-inset-left))] md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[calc(4rem+env(safe-area-inset-top))] shrink-0 items-center border-b border-slate-200 pb-0 pl-[calc(1.25rem+env(safe-area-inset-left))] pr-5 pt-[env(safe-area-inset-top)] md:pl-[calc(2rem+env(safe-area-inset-left))] md:pr-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-950">
            <CarIcon />
          </div>
          <p className="text-[18px] font-bold tracking-[-0.03em] text-[#081a43]">
            CarEval Pro
          </p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-950 md:hidden"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="hide-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-7">
          {sidebarItems.map((item) => {
            const isActive = pathname.includes(item.href);

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
                <span
                  className={isActive ? "text-[#081a43]" : "text-[#5f7190]"}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 px-2 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-1">
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-[15px] font-semibold transition-colors ${
              pathname.startsWith("/settings")
                ? "bg-slate-100 text-[#081a43]"
                : "text-[#405472] hover:bg-slate-50 hover:text-[#081a43]"
            }`}
          >
            <span
              className={
                pathname.startsWith("/settings")
                  ? "text-[#081a43]"
                  : "text-[#5f7190]"
              }
            >
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
