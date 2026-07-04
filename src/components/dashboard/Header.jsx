import { Search, Bell, RefreshCw, Menu } from "lucide-react";

export default function Header({ searchFocused, onSearchFocusChange, onOpenMobileSidebar }) {
  return (
    <header
      className="h-16 border-b border-slate-900 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-slate-950/80 backdrop-blur z-20"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="flex items-center gap-3 flex-1 max-w-xs lg:max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800 rounded-lg md:hidden transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-full">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
              searchFocused ? "text-cyan-400" : "text-slate-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search pipelines..."
            onFocus={() => onSearchFocusChange(true)}
            onBlur={() => onSearchFocusChange(false)}
            className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 focus:bg-slate-900 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent hover:border-slate-800/50 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </button>
        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
        <button className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap">
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Sync Data</span>
        </button>
      </div>
    </header>
  );
}
