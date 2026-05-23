import { Search, Bell, User, Menu } from 'lucide-react';

type NavbarProps = {
  onToggleSidebar?: () => void;
};

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur h-16">
      <div className="h-full flex items-center gap-3 px-4 sm:px-6 lg:px-8">

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden flex items-center justify-center rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search input — desktop only */}
        <div className="relative hidden lg:block w-110 xl:w-140">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search cars, evaluations, or reports..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border-none focus:ring-2 focus:ring-black/20 rounded-md outline-none"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full text-slate-500 transition hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <div className="flex p-2 items-center justify-center rounded-full border border-slate-200 bg-black/10 text-slate-700 shrink-0">
              <User size={16} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-950 leading-tight">Admin User</p>
              <p className="text-xs text-slate-500 leading-tight">admin@careval.com</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
