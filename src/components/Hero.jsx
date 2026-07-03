"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const COUNT = 600; // পার্টিকেল সংখ্যা বাড়িয়ে আরও গর্জিয়াস করা হয়েছে

function ParticleField({ scrollProgress, mouse }) {
  const pointsRef = useRef();

  const { rawPositions, gridPositions } = useMemo(() => {
    const raw = new Float32Array(COUNT * 3);
    const grid = new Float32Array(COUNT * 3);

    const cols = 30;
    const rows = Math.ceil(COUNT / cols);
    const spacing = 0.25;

    for (let i = 0; i < COUNT; i++) {
      // raw: ছড়ানো ছিটানো কসমিক ক্লাউড ডাটা
      raw[i * 3] = (Math.random() - 0.5) * 10;
      raw[i * 3 + 1] = (Math.random() - 0.5) * 10;
      raw[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // grid: অর্গানাইজড ম্যাট্রিক্স গ্রিড স্ট্রাকচার
      const col = i % cols;
      const row = Math.floor(i / cols);
      grid[i * 3] = (col - cols / 2) * spacing;
      grid[i * 3 + 1] = (row - rows / 2) * spacing;
      grid[i * 3 + 2] = Math.sin(col * 0.5) * 0.2; // সামান্য ডেপথ ওয়েভ
    }
    return { rawPositions: raw, gridPositions: grid };
  }, []);

  const current = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < COUNT * 3; i++) {
      const target =
        rawPositions[i] +
        (gridPositions[i] - rawPositions[i]) * scrollProgress.current;
      positions[i] += (target - positions[i]) * 0.05; // স্মুথ ট্রানজিশন স্পীড
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // মাউস দিয়ে থ্রিডি অবজেক্ট নিয়ন্ত্রণ ও অটো-রোটেশন
    pointsRef.current.rotation.y +=
      (mouse.current.x * 0.3 - pointsRef.current.rotation.y) * 0.02 + 0.001;
    pointsRef.current.rotation.x +=
      (mouse.current.y * 0.15 - pointsRef.current.rotation.x) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a855f7" // প্রিমিয়াম পার্পল গ্লোয়িং কালার
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={2} // Additive blending ফর নিওন ইফেক্ট
      />
    </points>
  );
}

export default function Hero() {
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const handleScroll = () => {
      const vh = window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / vh, 0), 1);
      scrollProgress.current = p;
    };

    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#030303] relative flex items-center overflow-hidden font-sans select-none border-b border-neutral-900">
      {/* ১. ফুলস্ক্রিন থ্রিডি ক্যানভাস ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        {ready && (
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={1.5} />
            <ParticleField scrollProgress={scrollProgress} mouse={mouse} />
          </Canvas>
        )}
      </div>

      {/* ২. প্রিমিয়াম গ্রেডিয়েন্ট এবং গ্রিড ওভারলে */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none z-10" />

      {/* ৩. মিনিমাল নেভিগেশন বার */}
      <header className="absolute top-0 inset-x-0 h-20 px-8 md:px-16 flex items-center justify-between z-30">
        <div className="text-white font-semibold text-xl tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
          Xai
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">
            Core Engine
          </a>
          <a href="#dashboard" className="hover:text-white transition-colors">
            Workspace
          </a>
        </div>
        <button className="px-4 py-1.5 text-xs font-medium text-white bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-all">
          Launch App
        </button>
      </header>

      {/* ৪. প্রিমিয়াম ডিজাইন কনটেন্ট লেআউট (লেফট-অ্যালাইন্ড স্টুডিও ইন্টারফেস) */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 relative z-20 pt-12">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          {/* ব্যাজ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 w-fit px-3 py-1 text-xs font-mono bg-purple-950/30 border border-purple-900/50 rounded-full text-purple-300 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            V2.0 Intelligence Loop Active
          </motion.div>

          {/* মেইন হেডিং */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.1]"
            >
              Turn raw data <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-200 to-neutral-400">
                into intelligence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base md:text-lg text-neutral-400 max-w-lg font-light leading-relaxed"
            >
              See how Xai transforms systemic chaos into computational clarity —
              completely automated on scroll.
            </motion.p>
          </div>

          {/* কল-টু-অ্যাকশন বাটন গ্রুপ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <button className="px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Initialize Cluster
            </button>
            <button className="px-6 py-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 font-medium text-sm hover:text-white hover:border-neutral-700 transition-all backdrop-blur-md">
              Read Documentation
            </button>
          </motion.div>
        </div>

        {/* ডানদিকের খালি স্পেস থ্রিডি ইন্টারেক্টিভ পার্টিকেলগুলোকে সম্পূর্ণ ফোকাসে নিয়ে আসে */}
        <div className="lg:col-span-5 h-48 lg:h-auto" />
      </div>

      {/* ৫. বটম স্ক্রোল গাইড */}
      <div className="absolute bottom-6 left-8 md:left-16 z-20 flex items-center gap-3 text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
        <span className="w-12 h-[1px] bg-neutral-800" />
        Scroll to structure data
      </div>
    </section>
  );
}
