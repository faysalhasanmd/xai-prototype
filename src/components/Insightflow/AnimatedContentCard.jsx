"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";
import AnimatedIcon from "./AnimatedIcon";

/**
 * Flips between a summary view and a "deployment spec" view on hover.
 * @param {{stage: object, isRowHovered: boolean}} props
 */
export default function AnimatedContentCard({ stage, isRowHovered }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full"
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="group relative h-full min-h-[240px] w-full overflow-hidden rounded-2xl border bg-[#060b18]/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-500"
        style={{
          borderColor: isHovered
            ? stage.accent
            : isRowHovered
              ? `${stage.accent}33`
              : "#1e293b",
          boxShadow: isHovered
            ? `inset 0 0 24px ${stage.accent}12, 0 20px 40px rgba(0,0,0,0.6), 0 0 15px ${stage.accent}15`
            : "0 10px 25px rgba(0,0,0,0.4)",
        }}
      >
        {/* Geometric corner tech borders */}
        <div
          className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? stage.accent : "transparent" }}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? stage.accent : "transparent" }}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? stage.accent : "transparent" }}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: isHovered ? stage.accent : "transparent" }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 250px at 85% 15%, ${stage.accentSoft}, transparent 75%)`,
          }}
        />

        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="front-content"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col justify-between gap-4"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <AnimatedIcon
                    icon={stage.icon}
                    accent={stage.accent}
                    isHovered={isHovered}
                  />
                  <span className="font-mono text-xs font-semibold tracking-wide text-slate-500">
                    0{stage.id}
                  </span>
                </div>

                <h3 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-white">
                  {stage.title}
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back-content"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col justify-between gap-4"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Activity
                      className="h-3.5 w-3.5"
                      style={{ color: stage.accent }}
                    />
                  </motion.div>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
                    {stage.title} Protocol
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-200 mb-1.5">
                  Deep Deployment Specifications:
                </h4>
                <p className="text-xs leading-relaxed text-slate-400 tracking-wide font-normal">
                  {stage.extendedDesc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: stage.accent }}
                  />
                  <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                    NODE_STATUS // RUNNING
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] uppercase font-bold tracking-wider"
                  style={{ color: stage.accent }}
                >
                  100% Verified
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
