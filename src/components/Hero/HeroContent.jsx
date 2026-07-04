"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations/variants";

/**
 * Center/left-aligned hero copy block: status badge, heading,
 * supporting paragraph, and the two primary CTAs.
 */
export default function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start space-y-5 sm:space-y-6"
    >
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase bg-cyan-950/20 border border-cyan-900/40 rounded text-cyan-400"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Ingest Loop Active
      </motion.div>

      {/* Fluid typography heading */}
      <div className="space-y-3 sm:space-y-4">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light tracking-tight text-[#ECEAE4] leading-[1.16] sm:leading-[1.1]"
        >
          Turn raw data <br />
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400">
            into live intelligence.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base text-[#8B8E96] max-w-md sm:max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
        >
          Seamlessly aggregate multi-source data streams into a unified
          state. Watch complex structural data transform into crisp
          computational clarity.
        </motion.p>
      </div>

      {/* CTAs - stack on small devices */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-3 sm:pt-4"
      >
        <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E8A33D] text-[#0A0B0D] font-medium text-[11px] sm:text-xs tracking-wider uppercase hover:bg-amber-400 active:scale-[0.97] transition-all duration-200">
          Initialize Node
        </button>
        <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#22252B] bg-[#131519]/60 text-[#8B8E96] font-medium text-[11px] sm:text-xs tracking-wider uppercase hover:text-[#ECEAE4] hover:border-cyan-500/30 active:scale-[0.97] transition-all duration-200">
          View Architecture
        </button>
      </motion.div>
    </motion.div>
  );
}
