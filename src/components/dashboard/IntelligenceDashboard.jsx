"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Filter } from "lucide-react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewTab from "./OverviewTab";
import AiLogsTab from "./AiLogsTab";
import IngestionTab from "./IngestionTab";
import SecurityTab from "./SecurityTab";
import { TAB_COPY, containerVariants } from "@/lib/dashboard-data";

export default function IntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      mirror: false,
    });
  }, []);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const copy = TAB_COPY[activeTab];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-cyan-500/30">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        <Header
          searchFocused={searchFocused}
          onSearchFocusChange={setSearchFocused}
          onOpenMobileSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-8"
            >
              {/* PAGE HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-100 capitalize">
                    {copy.title}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">{copy.description}</p>
                </div>
                <div className="flex gap-2 self-start sm:self-auto">
                  <button className="flex items-center gap-1.5 bg-slate-900 text-slate-300 border border-slate-800 text-xs px-2.5 py-1.5 rounded hover:border-slate-700 transition-colors">
                    <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter
                  </button>
                </div>
              </div>

              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "ai-logs" && <AiLogsTab />}
              {activeTab === "ingestion" && <IngestionTab />}
              {activeTab === "security" && <SecurityTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
