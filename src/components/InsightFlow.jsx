"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Database, Cpu, Lightbulb, ArrowUpRight } from "lucide-react";

// 1. Data Structure for the 3 Stages
const stages = [
  {
    id: 1,
    title: "Ingest Data",
    description:
      "Seamlessly aggregate multi-source data streams into a unified data lake with real-time validation.",
    icon: Database,
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(6, 182, 212, 0.12)",
    borderGlow: "group-hover:border-cyan-500/50",
  },
  {
    id: 2,
    title: "Analyze with AI",
    description:
      "Deep neural networks parse complex datasets to extract hidden patterns, anomalies, and correlations.",
    icon: Cpu,
    color: "from-purple-500 to-indigo-500",
    glow: "rgba(139, 92, 246, 0.12)",
    borderGlow: "group-hover:border-purple-500/50",
  },
  {
    id: 3,
    title: "Generate Insight",
    description:
      "Transform raw analytical intelligence into predictive, actionable strategies for automated execution.",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.12)",
    borderGlow: "group-hover:border-amber-500/50",
  },
];

export default function InsightFlow() {
  const containerRef = useRef(null);

  // Scroll Progress Setup for Geometry-based Line Masking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#030712] py-32 px-4 sm:px-6 lg:px-8 text-white font-sans overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-32">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        >
          Data Pipeline
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500"
        >
          Interactive Insight Flow
        </motion.h2>
      </div>

      {/* Main Flow Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* GEOMETRY ANIMATION: Connecting Background Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-900 -translate-x-1/2 z-0">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
          />
        </div>

        {/* Steps Loop */}
        <div className="space-y-32 relative z-10">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 60, damping: 18 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0"
              >
                {/* Card Container Side */}
                <div
                  className={`w-full md:w-[45%] order-2 ${
                    isEven ? "md:order-1" : "md:order-3"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`p-6 rounded-3xl bg-[#0b0f19]/40 border border-slate-900 backdrop-blur-xl group transition-all duration-300 shadow-2xl relative overflow-hidden ${stage.borderGlow}`}
                    style={{
                      boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.03)`,
                    }}
                  >
                    {/* Radial Glow on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 180px at 90% 10%, ${stage.glow}, transparent 100%)`,
                      }}
                    />

                    {/* Top Row: Icon badge + Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-br ${stage.color} bg-opacity-10 p-[1px]`}
                      >
                        <div className="bg-[#030712] p-2.5 rounded-[15px]">
                          <Icon className="w-5 h-5 text-slate-200 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-cyan-400 transition-colors duration-300">
                        // 0{stage.id}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        {stage.title}
                        <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-normal">
                        {stage.description}
                      </p>
                    </div>

                    {/* Premium Technical Corner Accents */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-800/60 group-hover:border-transparent transition-colors" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-800/60 group-hover:border-transparent transition-colors" />
                  </motion.div>
                </div>

                {/* Center Node / Icon */}
                <div className="w-16 h-16 flex items-center justify-center relative order-1 md:order-2 left-8 md:left-0 -translate-x-1/2 md:translate-x-0 mx-0 md:mx-auto z-20">
                  {/* Outer Geometric Rotating Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-2xl border border-dashed bg-[#030712] border-slate-800 group-hover:border-slate-500 transition-colors duration-300"
                    style={{ padding: "2px" }}
                  />

                  {/* Inner Node Core */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} p-[1px] shadow-xl flex items-center justify-center cursor-pointer transition-transform`}
                  >
                    <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center group">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${stage.color} shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Right Side Empty Space Block for desktop layout grid alignment */}
                <div className="hidden md:block w-[45%] order-3 md:order-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
