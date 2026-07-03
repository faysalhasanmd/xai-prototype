"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Responsive particle allocation based on screen sizing
function useParticleCount() {
  const [count, setCount] = useState(600);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 180; // Mobile
      if (w < 1024) return 340; // Tablet
      return 600; // Desktop
    };

    setCount(compute());
    const handleResize = () => setCount(compute());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return count;
}

function ParticleField({ scrollProgress, mouse, count }) {
  const pointsRef = useRef();

  const { rawPositions, gridPositions, colors } = useMemo(() => {
    const raw = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const colsArray = new Float32Array(count * 3);

    const cols = window.innerWidth < 640 ? 15 : 30;
    const spacing = window.innerWidth < 640 ? 0.22 : 0.26;

    const colorCyan = new THREE.Color("#00f2ff");
    const colorPurple = new THREE.Color("#a855f7");
    const colorAmber = new THREE.Color("#e8a33d");
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Raw state: distributed system cloud
      raw[i * 3] = (Math.random() - 0.5) * 8;
      raw[i * 3 + 1] = (Math.random() - 0.5) * 8;
      raw[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Structured grid layout coordinates
      const col = i % cols;
      const row = Math.floor(i / cols);
      grid[i * 3] = (col - cols / 2) * spacing;
      grid[i * 3 + 1] = (row - Math.ceil(count / cols) / 2) * spacing;
      grid[i * 3 + 2] = Math.sin(col * 0.4) * 0.15;

      // Color mapping interpolation matching image
      const factor = row / Math.ceil(count / cols);
      if (factor < 0.4) {
        tempColor.copy(colorCyan).lerp(colorPurple, factor * 2.5);
      } else {
        tempColor.copy(colorPurple).lerp(colorAmber, (factor - 0.4) * 1.66);
      }

      colsArray[i * 3] = tempColor.r;
      colsArray[i * 3 + 1] = tempColor.g;
      colsArray[i * 3 + 2] = tempColor.b;
    }
    return { rawPositions: raw, gridPositions: grid, colors: colsArray };
  }, [count]);

  const current = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count * 3; i++) {
      const target =
        rawPositions[i] +
        (gridPositions[i] - rawPositions[i]) * scrollProgress.current;
      positions[i] += (target - positions[i]) * 0.06;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Fluid responsive tracking speed adjustments
    pointsRef.current.rotation.y +=
      (mouse.current.x * 0.15 - pointsRef.current.rotation.y) * 0.03 + 0.0005;
    pointsRef.current.rotation.x +=
      (mouse.current.y * 0.08 - pointsRef.current.rotation.x) * 0.03;
  });

  return (
    <points key={count} ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={window.innerWidth < 640 ? 0.065 : 0.052}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero() {
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const particleCount = useParticleCount();

  useEffect(() => {
    setReady(true);

    const handleScroll = () => {
      const vh = window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / (vh * 0.75), 0), 1);
      scrollProgress.current = p;
    };

    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    // Touch device support mapping
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.current = {
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: (e.touches[0].clientY / window.innerHeight) * 2 - 1,
        };
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="w-full min-h-[100svh] relative flex items-center overflow-hidden select-none border-b"
      style={{ background: "#050608", borderColor: "#12141a" }}
    >
      {/* Three.js Layer Integration with Responsive Adjustments */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none md:translate-x-[15%] lg:translate-x-0">
        {ready && (
          <Canvas
            camera={{
              position: [0, 0, 4.6],
              fov: window.innerWidth < 640 ? 60 : 52,
            }}
          >
            <ambientLight intensity={1.2} />
            <ParticleField
              scrollProgress={scrollProgress}
              mouse={mouse}
              count={particleCount}
            />
          </Canvas>
        )}
      </div>

      {/* Grid Overlay Texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22252B 1px, transparent 1px), linear-gradient(to bottom, #22252B 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle 75% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 75% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* Glow Rings Mapping */}
      <div className="absolute top-1/4 right-[5%] sm:right-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-1/4 left-[2%] sm:left-[5%] w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none z-10" />

      {/* Header Viewport Safe Navigation */}
      <header className="absolute top-0 inset-x-0 h-16 sm:h-20 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between z-30 border-b border-[#22252B]/20 backdrop-blur-md">
        <div className="text-[#ECEAE4] font-medium text-sm sm:text-base tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2ff]" />
          Xai
        </div>

        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-[11px] lg:text-xs tracking-widest uppercase font-mono text-[#8B8E96]">
          <a
            href="#features"
            className="hover:text-cyan-400 transition-colors duration-300"
          >
            Core Engine
          </a>
          <a
            href="#workspace"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Workspace
          </a>
          <a
            href="#docs"
            className="hover:text-amber-400 transition-colors duration-300"
          >
            Documentation
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 sm:px-5 py-2 text-[10px] lg:text-xs font-mono tracking-wider uppercase text-[#ECEAE4] bg-[#131519] border border-[#22252B] rounded-full hover:border-cyan-500/40 transition-all duration-300">
            Launch Console
          </button>

          {/* Fully Responsive Mobile Burger Trigger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle structural menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#22252B] bg-[#131519] text-[#8B8E96] active:scale-95 transition-transform"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Dynamic Slide Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-16 inset-x-0 z-40 md:hidden mx-4 p-5 rounded-xl border border-[#22252B] bg-[#050608]/95 backdrop-blur-xl flex flex-col gap-4 text-xs font-mono text-[#8B8E96]"
          >
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 p-1"
            >
              Core Engine
            </a>
            <a
              href="#workspace"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-400 p-1"
            >
              Workspace
            </a>
            <a
              href="#docs"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-400 p-1"
            >
              Documentation
            </a>
            <button className="w-full mt-2 py-2.5 text-[10px] tracking-wider uppercase font-mono rounded-full border border-[#22252B] bg-[#131519] text-[#ECEAE4]">
              Launch Console
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layout Content - Grid System Optimized for all break-points */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-20 pt-20 pb-12 sm:pb-16 md:py-0 flex items-center">
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

          {/* Fluid Typography Heading */}
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

            {/* Paragraph Text Adjustments */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base text-[#8B8E96] max-w-md sm:max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Seamlessly aggregate multi-source data streams into a unified
              state. Watch complex structural data transform into crisp
              computational clarity.
            </motion.p>
          </div>

          {/* CTAs Stackable on small devices */}
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
      </div>

      {/* Bottom Indicator hidden on short viewports */}
      <div className="absolute bottom-6 left-4 sm:left-8 md:left-12 lg:left-16 z-20 hidden sm:flex items-center gap-3 text-[9px] font-mono tracking-[0.2em] text-[#4B4E57] uppercase">
        <span className="w-8 h-[1px] bg-cyan-500/30" />
        <span>Scroll to resolve matrix</span>
      </div>
    </section>
  );
}
