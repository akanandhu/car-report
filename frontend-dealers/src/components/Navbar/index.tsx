import { Bell, Car, Menu, Search, User } from "lucide-react";

type NavbarProps = {
  onOpenSidebar: () => void;
  hasSidebar?: boolean;
};

const Navbar = ({ onOpenSidebar, hasSidebar = true }: NavbarProps) => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 h-[calc(7.375rem+env(safe-area-inset-top))] border-b border-slate-200 bg-white md:h-[calc(4rem+env(safe-area-inset-top))] ${
        hasSidebar ? "md:left-[calc(16rem+env(safe-area-inset-left))]" : ""
      }`}
    >
      <div className="flex h-full flex-col gap-3 pb-3 pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] pt-[calc(0.75rem+env(safe-area-inset-top))] sm:pl-[calc(1.5rem+env(safe-area-inset-left))] sm:pr-[calc(1.5rem+env(safe-area-inset-right))] md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:pb-2 md:pt-[calc(0.5rem+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3 md:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
            <div className="flex min-w-0 items-center gap-2 text-[#081a43]">
              <Car className="shrink-0" size={22} />
              <span className="truncate text-base font-bold tracking-[-0.03em]">
                CarEval Pro
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <NotificationButton />
            <AdminProfile compact />
          </div>
        </div>

        <div className="relative w-full min-w-0 md:max-w-140 md:flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search cars, evaluations, or reports..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-black/10 md:border-transparent md:py-2"
          />
        </div>

        <div className="hidden shrink-0 items-center justify-end gap-6 md:flex">
          <NotificationButton />
          <div className="h-10 w-px bg-slate-200" />
          <AdminProfile />
        </div>
      </div>
    </header>
  );
};

const NotificationButton = () => (
  <button
    type="button"
    className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
    aria-label="Notifications"
  >
    <Bell size={20} />
    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
  </button>
);

const AdminProfile = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex min-w-0 items-center gap-2">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700">
      <User size={16} />
    </div>
    {!compact ? (
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-950">
          Admin User
        </p>
        <p className="truncate text-sm text-slate-500">admin@careval.com</p>
      </div>
    ) : null}
  </div>
);

export default Navbar;
