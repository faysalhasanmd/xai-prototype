"use client";

import { motion } from "framer-motion";

/**
 * Rotating dashed ring + solid gradient dot sitting on the center timeline.
 * @param {{accent: string, gradient: string, isRowHovered: boolean}} props
 */
export default function CenterNode({ accent, gradient, isRowHovered }) {
  return (
    <div className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center">
      <motion.div
        animate={{ rotate: 360, scale: isRowHovered ? 1.15 : 1 }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.3 },
        }}
        className="absolute inset-0 rounded-full border border-dashed"
        style={{
          borderColor: accent,
          opacity: isRowHovered ? 0.8 : 0.3,
        }}
      />
      <motion.div
        animate={{ scale: isRowHovered ? 1.1 : 1 }}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg`}
        style={{ boxShadow: isRowHovered ? `0 0 20px ${accent}66` : "none" }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-[#030712]" />
      </motion.div>
    </div>
  );
}
