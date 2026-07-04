"use client";

import { motion } from "framer-motion";
import { Sparkles, Database } from "lucide-react";

/**
 * Small icon that reacts with a distinct micro-animation on hover.
 * @param {{icon: React.ElementType, accent: string, isHovered: boolean}} props
 */
export default function AnimatedIcon({ icon: Icon, accent, isHovered }) {
  const iconVariants = {
    initial: { scale: 1, rotate: 0, y: 0 },
    hover: {
      scale: [1, 1.15, 0.95, 1.05, 1],
      rotate: Icon === Sparkles ? 180 : 0,
      y: Icon === Database ? [0, -4, 2, 0] : 0,
      transition: {
        duration: Icon === Sparkles ? 0.6 : 1.2,
        repeat: Icon === Sparkles ? 0 : Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={iconVariants}
      animate={isHovered ? "hover" : "initial"}
      className="flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300"
      style={{
        borderColor: isHovered ? `${accent}66` : `${accent}22`,
        background: isHovered
          ? `radial-gradient(circle at center, ${accent}30 0%, transparent 80%)`
          : `radial-gradient(circle at center, ${accent}15 0%, transparent 80%)`,
        boxShadow: isHovered ? `0 0 12px ${accent}22` : "none",
      }}
    >
      <Icon className="h-5 w-5" style={{ color: accent }} />
    </motion.div>
  );
}
