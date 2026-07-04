"use client";

import { useEffect } from "react";

/**
 * Drives the HUD readouts (percentage text, progress bar width,
 * edge counter, state label) directly via refs on every animation
 * frame, reading from `progressRef` set by the scroll-trigger hook.
 * Bypassing React state here avoids a re-render on every frame.
 *
 * @param {{
 *   progressRef: React.MutableRefObject<number>,
 *   totalEdges: number,
 *   coherenceTextRef: React.RefObject<HTMLElement>,
 *   stateTextRef: React.RefObject<HTMLElement>,
 *   edgeTextRef: React.RefObject<HTMLElement>,
 *   barRef: React.RefObject<HTMLElement>,
 * }} refs
 */
export function useHUDSync({
  progressRef,
  totalEdges,
  coherenceTextRef,
  stateTextRef,
  edgeTextRef,
  barRef,
}) {
  useEffect(() => {
    let raf;
    const tick = () => {
      const p = progressRef.current;
      const pct = Math.round(p * 100);

      if (coherenceTextRef.current)
        coherenceTextRef.current.textContent = `${pct}%`;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (edgeTextRef.current)
        edgeTextRef.current.textContent = `${Math.round(p * totalEdges)} / ${totalEdges}`;
      if (stateTextRef.current) {
        stateTextRef.current.textContent =
          p < 0.15 ? "SCATTERED" : p < 0.7 ? "CLUSTERING" : "COHERENT SYSTEM";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, [progressRef, totalEdges, coherenceTextRef, stateTextRef, edgeTextRef, barRef]);
}
