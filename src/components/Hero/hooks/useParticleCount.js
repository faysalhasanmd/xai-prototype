"use client";

import { useState, useEffect } from "react";

/**
 * Returns a particle count tuned to viewport width, and keeps it
 * in sync on resize. Isolated so the Canvas component doesn't need
 * to know about breakpoint logic.
 */
export function useParticleCount() {
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
