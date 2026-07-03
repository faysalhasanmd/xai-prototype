"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Database, Cpu, Sparkles, ArrowUpRight, Activity } from "lucide-react";

const stages = [
  {
    id: 1,
    title: "Ingest Data",
    description:
      "Seamlessly aggregate multi-source data streams into a unified data lake with real-time validation.",
    extendedDesc:
      "Connect to Kafka clusters, AWS S3, or REST webhooks instantly. Automated schema registry checks ensure zero data corruption during high-throughput enterprise ingestion cycles.",
    icon: Database,
    accent: "#22d3ee",
    accentSoft: "rgba(34, 211, 238, 0.05)",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Analyze with AI",
    description:
      "Deep neural networks parse complex datasets to extract hidden patterns, anomalies, and correlations.",
    extendedDesc:
      "Leverage automated LLM fine-tuning and localized neural mapping. Detect critical pipeline anomalies and multi-variate behavioral metrics within sub-millisecond windows.",
    icon: Cpu,
    accent: "#a78bfa",
    accentSoft: "rgba(167, 139, 250, 0.05)",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    id: 3,
    title: "Generate Insight",
    description:
      "Transform raw analytical intelligence into predictive, actionable strategies for automated execution.",
    extendedDesc:
      "Deploy production-ready predictive models directly to your operations ecosystem. Drive corporate growth via autonomous API webhooks and automated trigger routines.",
    icon: Sparkles,
    accent: "#fbbf24",
    accentSoft: "rgba(251, 191, 36, 0.05)",
    gradient: "from-amber-400 to-orange-500",
  },
];

/* ---------- Micro-Animated Icon Component ---------- */
function AnimatedIcon({ icon: Icon, accent, isHovered }) {
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

/* ---------- Smooth Content Switcher Card ---------- */
function AnimatedContentCard({ stage }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full"
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative h-[230px] w-full overflow-hidden rounded-2xl border border-slate-900 bg-[#0a0f1c]/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-slate-700/80"
        style={{
          boxShadow: isHovered
            ? `inset 0 0 20px ${stage.accent}08, 0 15px 30px rgba(0,0,0,0.5)`
            : "0 10px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 220px at 85% 15%, ${stage.accentSoft}, transparent 70%)`,
          }}
        />

        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="front-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex h-full flex-col justify-between"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <AnimatedIcon
                    icon={stage.icon}
                    accent={stage.accent}
                    isHovered={isHovered}
                  />
                  <span className="font-mono text-xs font-semibold tracking-wide text-slate-600">
                    0{stage.id}
                  </span>
                </div>

                <h3 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight text-white group-hover:text-slate-100">
                  {stage.title}
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-400" />
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex h-full flex-col justify-between"
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
                  <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
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

              <div className="flex items-center justify-between border-t border-slate-900/80 pt-3">
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

/* ---------- Perfect Alignment Center Node ---------- */
function CenterNode({ accent, gradient }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{ rotate: 360, scale: hovered ? 1.1 : 1 }}
        transition={{
          rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.4, ease: "easeOut" },
        }}
        className="absolute inset-0 rounded-full border border-dashed"
        style={{
          borderColor: accent,
          opacity: hovered ? 0.7 : 0.35,
        }}
      />
      <motion.div
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg`}
        style={{ boxShadow: hovered ? `0 0 18px ${accent}55` : "none" }}
      >
        <div className="h-2 w-2 rounded-full bg-[#030712]" />
      </motion.div>
    </div>
  );
}

/* ---------- Shared geometric motif ---------- */
function StageMotif({ stage }) {
  const { accent, id } = stage;

  return (
    <svg
      viewBox="0 0 240 200"
      className="h-full w-full max-w-[230px]"
      role="img"
      aria-label={`${stage.title} illustration`}
    >
      <defs>
        <pattern
          id={`dots-${id}`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill={accent} fillOpacity="0.22" />
        </pattern>
      </defs>
      <rect x="14" y="14" width="212" height="172" fill={`url(#dots-${id})`} />

      {[
        { x: 14, y: 14, dx: 1, dy: 1 },
        { x: 226, y: 14, dx: -1, dy: 1 },
        { x: 14, y: 186, dx: 1, dy: -1 },
        { x: 226, y: 186, dx: -1, dy: -1 },
      ].map((c, i) => (
        <path
          key={i}
          d={`M ${c.x} ${c.y + c.dy * 12} L ${c.x} ${c.y} L ${c.x + c.dx * 12} ${c.y}`}
          stroke={accent}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          fill="none"
        />
      ))}

      {id === 1 && (
        <g>
          {[
            { y: 44, w: 96, o: 0.9 },
            { y: 88, w: 74, o: 0.75 },
            { y: 132, w: 52, o: 0.6 },
          ].map((tray, i) => (
            <polygon
              key={i}
              points={`${120 - tray.w / 2 - 12},${tray.y + 10} ${120 - tray.w / 2 + 12},${tray.y - 10} ${120 + tray.w / 2 + 12},${tray.y - 10} ${120 + tray.w / 2 - 12},${tray.y + 10}`}
              fill="#0a0f1c"
              stroke={accent}
              strokeOpacity={tray.o}
              strokeWidth="1.4"
            />
          ))}
          {[-1, 0, 1].map((offset, i) => (
            <motion.circle
              key={i}
              cx={120 + offset * 26}
              r="2.6"
              fill={accent}
              animate={{ cy: [34, 60, 34], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          {[-1, 0, 1].map((offset, i) => (
            <motion.circle
              key={`b-${i}`}
              cx={120 + offset * 18}
              r="2.2"
              fill={accent}
              animate={{ cy: [78, 104, 78], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: 0.3 + i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          <ellipse
            cx="120"
            cy="150"
            rx="30"
            ry="9"
            fill="none"
            stroke={accent}
            strokeWidth="1.4"
          />
        </g>
      )}

      {id === 2 && (
        <g style={{ transformOrigin: "120px 100px" }}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "120px 100px" }}
          >
            <polygon
              points="120,58 158,80 120,102 82,80"
              fill="none"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.85"
            />
            <polygon
              points="82,80 120,102 120,146 82,124"
              fill="#0a0f1c"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.6"
            />
            <polygon
              points="158,80 120,102 120,146 158,124"
              fill="#0a0f1c"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.4"
            />
            {[
              [120, 58],
              [158, 80],
              [120, 102],
              [82, 80],
              [120, 146],
              [82, 124],
              [158, 124],
            ].map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill={accent} />
            ))}
          </motion.g>
          <motion.line
            x1="70"
            x2="170"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.55"
            animate={{ y1: [60, 148, 60], y2: [60, 148, 60] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      )}

      {id === 3 && (
        <g>
          <motion.circle
            cx="120"
            cy="100"
            r="62"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="1 7"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            style={{ transformOrigin: "120px 100px" }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <circle
            cx="120"
            cy="100"
            r="40"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <circle
            cx="120"
            cy="100"
            r="20"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <motion.line
            x1="120"
            y1="100"
            x2="120"
            y2="38"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ transformOrigin: "120px 100px" }}
            animate={{ rotate: [0, 300, 620, 720] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.8, 1],
            }}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="46"
              x2="120"
              y2="38"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.35"
              style={{
                transformOrigin: "120px 100px",
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
          <motion.circle
            cx="120"
            cy="100"
            r="6"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            animate={{ r: [6, 26, 6], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
          />
          <circle cx="120" cy="100" r="5" fill={accent} />
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={104 + i * 10}
              width="6"
              rx="1.5"
              fill={accent}
              animate={{ y: [166, 150 - i * 6], height: [0, 16 + i * 6] }}
              transition={{
                duration: 0.6,
                delay: 2.6 + i * 0.15,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

/* ---------- Main Component ---------- */
export default function InsightFlow() {
  const containerRef = useRef(null);

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
      className="relative bg-[#030712] px-4 py-16 font-sans text-white sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <div className="relative z-10 mx-auto mb-12 max-w-2xl text-center sm:mb-16 md:mb-20 lg:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-cyan-800/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400"
        >
          Data Pipeline
        </motion.span>
        <h2 className="mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:mt-5 sm:text-4xl lg:text-5xl">
          Interactive insight flow
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
          From raw signal to acted-on insight, in three deliberate stages.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-8 md:px-0">
        {/* Main Vertical Line */}
        <div className="absolute bottom-0 left-4 top-0 z-0 w-[2px] -translate-x-1/2 bg-slate-900 md:left-1/2">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="h-full w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-amber-500"
          />
        </div>

        {/* Rows */}
        <div className="relative z-10 space-y-16 md:space-y-24">
          {stages.map((stage, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 60, damping: 18 }}
                className="group/row flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 lg:gap-12"
              >
                {/* Left Block: order is ALWAYS fixed (order-1 on desktop). Only the
                    content inside (card vs motif) alternates via isEven, which is
                    what actually produces the zigzag layout. */}
                <div className="w-full pl-8 md:pl-0 order-2 md:order-1">
                  {isEven ? (
                    <AnimatedContentCard stage={stage} />
                  ) : (
                    <div className="flex justify-center opacity-75 group-hover/row:opacity-100 transition-opacity duration-300">
                      <StageMotif stage={stage} />
                    </div>
                  )}
                </div>

                {/* Middle Center Node */}
                <div className="absolute left-4 md:relative md:left-0 md:order-2 -translate-x-1/2 md:translate-x-0">
                  <CenterNode accent={stage.accent} gradient={stage.gradient} />
                </div>

                {/* Right Block: order is ALWAYS fixed (order-3 on desktop). */}
                <div className="w-full pl-8 md:pl-0 order-3 md:order-3">
                  {isEven ? (
                    <div className="flex justify-center opacity-75 group-hover/row:opacity-100 transition-opacity duration-300">
                      <StageMotif stage={stage} />
                    </div>
                  ) : (
                    <AnimatedContentCard stage={stage} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
