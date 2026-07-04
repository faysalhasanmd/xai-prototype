"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

import { useParticleCount } from "./hooks/useParticleCount";
import ParticleField from "./canvas/ParticleField";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import HeroContent from "./HeroContent";

/**
 * Hero — landing section with a scroll/pointer-reactive Three.js
 * particle field, top navigation, and the primary headline + CTAs.
 */
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

  return (
    <section
      className="w-full min-h-[100svh] relative flex items-center overflow-hidden select-none border-b"
      style={{ background: "#050608", borderColor: "#12141a" }}
    >
      {/* Three.js particle layer */}
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

      {/* Grid overlay texture */}
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

      {/* Glow rings */}
      <div className="absolute top-1/4 right-[5%] sm:right-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-1/4 left-[2%] sm:left-[5%] w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none z-10" />

      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Content grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-20 pt-20 pb-12 sm:pb-16 md:py-0 flex items-center">
        <HeroContent />
      </div>

      {/* Bottom scroll indicator (hidden on short viewports) */}
      <div className="absolute bottom-6 left-4 sm:left-8 md:left-12 lg:left-16 z-20 hidden sm:flex items-center gap-3 text-[9px] font-mono tracking-[0.2em] text-[#4B4E57] uppercase">
        <span className="w-8 h-[1px] bg-cyan-500/30" />
        <span>Scroll to resolve matrix</span>
      </div>
    </section>
  );
}
