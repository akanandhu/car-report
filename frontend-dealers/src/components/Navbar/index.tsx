import Magnifier from "@/public/assets/svg/Magnifier";

const BellIcon = () => (
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
    <path d="M15 17H5.5a1 1 0 0 1-.8-1.6L6 13.7V10a6 6 0 1 1 12 0v3.7l1.3 1.7a1 1 0 0 1-.8 1.6H17" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

const UserIcon = () => (
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
    <circle cx="12" cy="8" r="3.25" />
    <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
  </svg>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur h-16">
      <div className="flex flex-col gap-4 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="relative w-full max-w-[560px]">
          <Magnifier className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search cars, evaluations, or reports..."
            className="h-8 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700">
              <UserIcon />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-slate-950">Admin User</p>
              <p className="text-sm text-slate-500">admin@careval.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
