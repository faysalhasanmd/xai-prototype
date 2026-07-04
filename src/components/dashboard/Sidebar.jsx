import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";
import { sidebarItems } from "@/lib/dashboard-data";

function SidebarContent({ activeTab, onSelectTab, onClose }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              Aether.AI
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="absolute inset-0 bg-slate-900 rounded-lg border border-slate-800/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10 text-slate-400 group-hover:text-slate-200 transition-colors">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />
                  <span className={isActive ? "text-slate-100" : ""}>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="relative z-10 text-xxs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center gap-3 mt-auto">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
          <span className="text-xs font-mono font-bold text-cyan-400">BD</span>
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-medium text-slate-200 truncate">Production-Node-01</p>
          <p className="text-xxs text-emerald-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="w-64 border-r border-slate-900 bg-slate-950 p-6 hidden md:flex flex-col shrink-0 z-30"
        data-aos="fade-right"
        data-aos-duration="700"
      >
        <SidebarContent activeTab={activeTab} onSelectTab={onSelectTab} onClose={onCloseMobile} />
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-900 p-6 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent activeTab={activeTab} onSelectTab={onSelectTab} onClose={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
