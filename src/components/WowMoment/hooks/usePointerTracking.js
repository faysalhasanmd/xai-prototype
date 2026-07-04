"use client";

import { useRef, useEffect } from "react";

/**
 * Tracks pointer position (mouse or touch) normalized to [-1, 1]
 * relative to the bounding box of `containerRef`. Used to gently
 * steer the 3D cluster's rotation toward the pointer.
 *
 * @param {React.RefObject<HTMLElement>} containerRef
 * @returns {React.MutableRefObject<{x:number,y:number}>}
 */
export function usePointerTracking(containerRef) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleInteraction = (clientX, clientY) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: ((clientX - rect.left) / rect.width) * 2 - 1,
        y: -((clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const handleMouseMove = (e) => handleInteraction(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return mouseRef;
}
