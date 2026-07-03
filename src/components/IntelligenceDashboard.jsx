"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LayoutDashboard,
  Brain,
  Database,
  ShieldAlert,
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  RefreshCw,
  BarChart3,
  Filter,
  Menu, // Added for mobile trigger
  X, // Added for drawer close
} from "lucide-react";

// --- Static Mock Data ---
const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "ai-logs", label: "AI Inference Logs", icon: Brain },
  { id: "ingestion", label: "Data Streams", icon: Database },
  { id: "security", label: "Threat Detection", icon: ShieldAlert, badge: "2" },
];

const metrics = [
  {
    title: "Avg. Inference Latency",
    value: "42.8 ms",
    change: "-12.4%",
    isPositive: true,
    trend: "last 60m",
  },
  {
    title: "Model Accuracy Rate",
    value: "99.42%",
    change: "+0.08%",
    isPositive: true,
    trend: "vs yesterday",
  },
  {
    title: "Token Ingestion / sec",
    value: "14,820",
    change: "+8.2%",
    isPositive: true,
    trend: "live stream",
  },
  {
    title: "Anomalies Flagged",
    value: "3 Detected",
    change: "+1",
    isPositive: false,
    trend: "requires review",
  },
];

const recentInferences = [
  {
    id: "INF-8492",
    pipeline: "Customer Sentiment",
    model: "Llama-3-70B",
    status: "Success",
    confidence: "98.2%",
    time: "2 mins ago",
  },
  {
    id: "INF-8491",
    pipeline: "Fraud Vector Analysis",
    model: "DeepSeek-R1",
    status: "Flagged",
    confidence: "91.4%",
    time: "5 mins ago",
  },
  {
    id: "INF-8490",
    pipeline: "Anomaly Detection",
    model: "Custom-CNN",
    status: "Success",
    confidence: "95.6%",
    time: "12 mins ago",
  },
  {
    id: "INF-8489",
    pipeline: "Supply Chain Predictor",
    model: "GPT-4o-mini",
    status: "Success",
    confidence: "89.1%",
    time: "18 mins ago",
  },
];

export default function IntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  // Animation variants for standard entry (tab switch e use hoy)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Reusable Navigation Links Component
  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo Zone */}
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              Aether.AI
            </span>
          </div>
          {/* Close button inside mobile drawer */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-100 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false); // Close drawer on mobile click
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className="absolute inset-0 bg-slate-900 rounded-lg border border-slate-800/60"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10 text-slate-400 group-hover:text-slate-200 transition-colors">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`}
                  />
                  <span className={isActive ? "text-slate-100" : ""}>
                    {item.label}
                  </span>
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

      {/* User Workspace Status */}
      <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center gap-3 mt-auto">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
          <span className="text-xs font-mono font-bold text-cyan-400">BD</span>
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-medium text-slate-200 truncate">
            Production-Node-01
          </p>
          <p className="text-xxs text-emerald-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-cyan-500/30"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      {/* 1. DESKTOP SIDEBAR (Visible on md and up) */}
      <aside
        className="w-64 border-r border-slate-900 bg-slate-950 p-6 hidden md:flex flex-col shrink-0 z-30"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <SidebarContent />
      </aside>

      {/* 2. MOBILE & TABLET DRAWER (AnimatePresence used for smooth open/close) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sliding Drawer Sheet */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-900 p-6 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT PANEL */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Top Operational Navbar */}
        <header
          className="h-16 border-b border-slate-900 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-slate-950/80 backdrop-blur z-20"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {/* Hamburger Menu Trigger & Search bar Container */}
          <div className="flex items-center gap-3 flex-1 max-w-xs lg:max-w-md">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800 rounded-lg md:hidden transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Search Input */}
            <div className="relative w-full">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchFocused ? "text-cyan-400" : "text-slate-500"}`}
              />
              <input
                type="text"
                placeholder="Search pipelines..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 focus:bg-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Action Hub */}
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

        {/* Dynamic Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Tab Title Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-100 capitalize">
                    {activeTab === "overview"
                      ? "System Intelligence Overview"
                      : activeTab.replace("-", " ")}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time infrastructure modeling and model diagnostic
                    interfaces.
                  </p>
                </div>
                <div className="flex gap-2 self-start sm:self-auto">
                  <button className="flex items-center gap-1.5 bg-slate-900 text-slate-300 border border-slate-800 text-xs px-2.5 py-1.5 rounded hover:border-slate-700 transition-colors">
                    <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter
                  </button>
                </div>
              </div>

              {activeTab === "overview" ? (
                <>
                  {/* 3. METRIC CARDS GRID */}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    {metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{
                          y: -2,
                          borderColor: "rgba(51, 65, 85, 0.7)",
                        }}
                        className="bg-slate-900/20 border border-slate-900 p-5 rounded-xl transition-colors duration-200"
                      >
                        <p className="text-xs font-medium text-slate-500 tracking-wide">
                          {metric.title}
                        </p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-2xl font-semibold tracking-tight text-slate-200 font-mono">
                            {metric.value}
                          </span>
                          <span
                            className={`text-xs font-medium flex items-center ${metric.isPositive ? "text-emerald-400" : "text-amber-400"}`}
                          >
                            {metric.isPositive ? (
                              <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 mr-0.5" />
                            )}
                            {metric.change}
                          </span>
                        </div>
                        <p className="text-xxs text-slate-600 mt-1 font-mono uppercase tracking-wider">
                          {metric.trend}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* 4. ANALYTICS & DATATABLE SUBSECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mock Analytics Chart Panel */}
                    <motion.div
                      variants={itemVariants}
                      data-aos="fade-right"
                      data-aos-delay="300"
                      className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-xl p-5 flex flex-col justify-between h-80"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Inference Throughput Volume
                          </h3>
                        </div>
                        <span className="text-xxs text-slate-500 font-mono">
                          10s Intervals
                        </span>
                      </div>

                      {/* Geometry-based Geometric Bars Mock Chart */}
                      <div className="h-48 flex items-end gap-1 sm:gap-1.5 pt-4 px-2 border-b border-l border-slate-900/60 overflow-hidden">
                        {[
                          40, 55, 45, 60, 75, 50, 65, 80, 95, 70, 85, 60, 50,
                          65, 85, 100, 75, 90, 110, 95,
                        ].map((val, idx) => (
                          <div
                            key={idx}
                            className="flex-1 bg-slate-900 rounded-t-sm relative group h-full flex items-end"
                          >
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${val}%` }}
                              transition={{
                                delay: idx * 0.015,
                                duration: 0.5,
                                ease: "easeOut",
                              }}
                              className="w-full bg-gradient-to-t from-slate-900 via-cyan-950/40 to-cyan-500/80 rounded-t-sm group-hover:to-cyan-400 transition-all duration-150"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-xxs text-slate-600 font-mono mt-2">
                        <span>20:45</span>
                        <span className="hidden sm:inline">20:50</span>
                        <span className="hidden sm:inline">20:55</span>
                        <span>21:00 (Current)</span>
                      </div>
                    </motion.div>

                    {/* Operational Guardrails Box */}
                    <motion.div
                      variants={itemVariants}
                      data-aos="fade-left"
                      data-aos-delay="350"
                      className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-4">
                          <BarChart3 className="w-4 h-4 text-indigo-400" />
                          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Model Token Weight
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Current global resource load distribution scaled
                          across live infrastructure cluster pipelines.
                        </p>
                      </div>

                      {/* Distribution Bars */}
                      <div className="space-y-3 my-4">
                        {[
                          {
                            name: "Llama-3-70B",
                            percentage: 54,
                            color: "bg-cyan-500",
                          },
                          {
                            name: "DeepSeek-R1",
                            percentage: 28,
                            color: "bg-purple-500",
                          },
                          {
                            name: "Others / Custom",
                            percentage: 18,
                            color: "bg-slate-700",
                          },
                        ].map((model, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xxs text-slate-400 font-mono">
                              <span>{model.name}</span>
                              <span>{model.percentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${model.percentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`h-full ${model.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1">
                        View Allocation Matrix{" "}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  </div>

                  {/* 5. DATA TABLE PREVIEW */}
                  <motion.div
                    variants={itemVariants}
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="bg-slate-900/20 border border-slate-900 rounded-xl overflow-hidden"
                  >
                    <div className="p-5 border-b border-slate-900 flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Live Execution Logs
                      </h3>
                      <span className="flex items-center gap-1.5 text-xxs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />{" "}
                        Streaming Live
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-slate-900 text-slate-500 font-medium bg-slate-950/40">
                            <th className="p-4 font-mono">Inference ID</th>
                            <th className="p-4">Pipeline</th>
                            <th className="p-4">Target Core Model</th>
                            <th className="p-4 text-right">Confidence</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-right text-slate-600">
                              Timestamp
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 font-medium text-slate-300">
                          {recentInferences.map((log) => (
                            <tr
                              key={log.id}
                              className="hover:bg-slate-900/30 transition-colors group"
                            >
                              <td className="p-4 font-mono text-cyan-500 group-hover:text-cyan-400 transition-colors">
                                {log.id}
                              </td>
                              <td className="p-4 text-slate-200">
                                {log.pipeline}
                              </td>
                              <td className="p-4 text-slate-400 font-mono text-xxs">
                                {log.model}
                              </td>
                              <td className="p-4 text-right font-mono text-slate-400">
                                {log.confidence}
                              </td>
                              <td className="p-4 text-center">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-xxs font-semibold tracking-wide ${
                                    log.status === "Success"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  }`}
                                >
                                  {log.status}
                                </span>
                              </td>
                              <td className="p-4 text-right text-slate-500 text-xxs font-mono">
                                {log.time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </>
              ) : (
                /* Tab Fallback Message Area */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 border border-dashed border-slate-900 rounded-xl flex flex-col items-center justify-center text-center p-6"
                >
                  <Brain className="w-8 h-8 text-slate-700 mb-3 animate-pulse" />
                  <p className="text-sm font-medium text-slate-400">
                    Section Active: {activeTab.replace("-", " ")}
                  </p>
                  <p className="text-xs text-slate-600 max-w-xs mt-1">
                    This specific sub-interface view is hooked into live
                    webhooks.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
