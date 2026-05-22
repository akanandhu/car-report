import { Search, Bell, User} from 'lucide-react'



const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur h-16">
      <div className="h-full flex flex-col gap-4 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="relative w-full max-w-[560px]">
          <Search size={16} className="absolute left-4 top-1/2  -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search cars, evaluations, or reports..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border-none focus:ring-2 focus:ring-black/20 rounded-md outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <button
            type="button"
            className="relative flex items-center justify-center rounded-full  text-slate-500 transition hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="hidden h-10 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <div className="flex p-2 items-center justify-center rounded-full border border-slate-200 bg-black/10 text-slate-700">
              <User size={16} />
            </div>
            <div className="">
              <p className="text-sm font-semibold text-slate-950">Admin User</p>
              <p className="text-sm text-slate-500">admin@careval.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
