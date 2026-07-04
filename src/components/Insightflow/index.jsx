"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { stages } from "./data/stages";
import { rowContainerVariants, itemVariants } from "./animations/variants";
import AnimatedContentCard from "./AnimatedContentCard";
import CenterNode from "./CenterNode";
import StageMotif from "./StageMotif";

/**
 * InsightFlow — three-stage scroll-driven pipeline section
 * (Ingest -> Analyze -> Insight) with a center timeline that
 * fills in sync with scroll progress.
 */
export default function InsightFlow() {
  const containerRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

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
      className="relative bg-[#030712] px-4 py-20 font-sans text-white sm:px-6 sm:py-28 lg:px-8 lg:py-36 overflow-hidden"
    >
      {/* Dynamic grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header */}
      <div className="relative z-10 mx-auto mb-20 max-w-2xl text-center sm:mb-24 md:mb-28">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400"
        >
          Data Pipeline
        </motion.span>
        <h2 className="mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
          Interactive Insight Flow
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          From raw signal to acted-on insight, in three deliberate stages.
        </p>
      </div>

      {/* Timeline wrapper */}
      <div className="relative mx-auto max-w-5xl">
        {/* Main vertical center line (tracks scroll progress) */}
        <div className="absolute bottom-0 left-6 top-0 z-0 w-[2px] -translate-x-1/2 bg-slate-900 md:left-1/2">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="h-full w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-amber-500"
          />
        </div>

        {/* Rows */}
        <div className="relative z-10 space-y-16 md:space-y-32">
          {stages.map((stage, index) => {
            const isEven = index % 2 === 0;
            const isRowHovered = hoveredRow === stage.id;

            return (
              <motion.div
                key={stage.id}
                variants={rowContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                onMouseEnter={() => setHoveredRow(stage.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="group/row grid grid-cols-[48px_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10 lg:gap-16 w-full relative"
              >
                {/* 1. Center node (animates first in row sequence) */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center items-center h-full w-full md:order-2 md:col-auto"
                >
                  <CenterNode
                    accent={stage.accent}
                    gradient={stage.gradient}
                    isRowHovered={isRowHovered}
                  />
                </motion.div>

                {/* 2. Left column content */}
                <div className="w-full md:order-1 flex justify-center md:justify-end">
                  {isEven ? (
                    <motion.div variants={itemVariants} className="w-full">
                      <AnimatedContentCard
                        stage={stage}
                        isRowHovered={isRowHovered}
                      />
                    </motion.div>
                  ) : (
                    <>
                      {/* Mobile view card */}
                      <motion.div
                        variants={itemVariants}
                        className="block md:hidden w-full"
                      >
                        <AnimatedContentCard
                          stage={stage}
                          isRowHovered={isRowHovered}
                        />
                      </motion.div>
                      {/* Desktop view SVG motif */}
                      <motion.div
                        variants={itemVariants}
                        className="hidden md:flex justify-center w-full transition-all duration-500 transform group-hover/row:scale-105"
                      >
                        <StageMotif stage={stage} />
                      </motion.div>
                    </>
                  )}
                </div>

                {/* 3. Right column content (desktop only) */}
                <div className="hidden md:flex w-full md:order-3 justify-center md:justify-start">
                  {!isEven ? (
                    <motion.div variants={itemVariants} className="w-full">
                      <AnimatedContentCard
                        stage={stage}
                        isRowHovered={isRowHovered}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center w-full transition-all duration-500 transform group-hover/row:scale-105"
                    >
                      <StageMotif stage={stage} />
                    </motion.div>
                  )}
                </div>

                {/* 4. Mobile-only motif placed underneath */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-2 md:hidden flex justify-center pt-4"
                >
                  <StageMotif stage={stage} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
