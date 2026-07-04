"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";

import { NODE_COUNT, NEIGHBORS_PER_NODE, fibonacciSphere, buildEdges } from "./utils/geometry";
import DataCluster from "./canvas/DataCluster";
import { useResponsiveCamera } from "./hooks/useResponsiveCamera";
import { usePointerTracking } from "./hooks/usePointerTracking";
import { useWowMomentScroll } from "./hooks/useWowMomentScroll";
import { useHUDSync } from "./hooks/useHUDSync";
import SectionHeader from "./SectionHeader";
import LeftHUD from "./LeftHUD";
import RightHUD from "./RightHUD";
import SectionFooter from "./SectionFooter";

/**
 * WowMoment — pinned scroll-driven section where a scattered 3D
 * point cloud resolves into a connected Fibonacci-sphere lattice,
 * with a live HUD reflecting scroll progress.
 */
export default function WowMoment() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(0);

  const [ready, setReady] = useState(false);

  const coherenceTextRef = useRef(null);
  const stateTextRef = useRef(null);
  const edgeTextRef = useRef(null);
  const barRef = useRef(null);

  const cameraZ = useResponsiveCamera();
  const mouseRef = usePointerTracking(containerRef);

  const totalEdges = useMemo(
    () =>
      buildEdges(fibonacciSphere(NODE_COUNT, 1), NEIGHBORS_PER_NODE).length / 2,
    [],
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useWowMomentScroll(sectionRef, progressRef);
  useHUDSync({
    progressRef,
    totalEdges,
    coherenceTextRef,
    stateTextRef,
    edgeTextRef,
    barRef,
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#030303] relative overflow-hidden flex flex-col justify-between py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* Background matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none z-0" />

      <SectionHeader />

      {/* Main responsive glass workspace container */}
      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto flex-1 my-4 sm:my-6 md:my-8 relative rounded-xl sm:rounded-2xl border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md overflow-hidden shadow-[0_0_50px_-25px_rgba(6,182,212,0.15)] z-10 min-h-[340px] sm:min-h-[400px] md:min-h-[450px]"
      >
        <LeftHUD
          stateTextRef={stateTextRef}
          edgeTextRef={edgeTextRef}
          totalEdges={totalEdges}
        />
        <RightHUD coherenceTextRef={coherenceTextRef} barRef={barRef} />

        {/* Laboratory framing HUD borders */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20" />
          <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20" />
          <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20" />
          <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20" />
        </div>

        {/* Responsive 3D core canvas layer */}
        {ready && (
          <Canvas
            camera={{ position: [0, 0, cameraZ], fov: 50 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
            <pointLight
              position={[-5, -4, 4]}
              intensity={1.2}
              color="#06b6d4"
            />
            <DataCluster progressRef={progressRef} mouseRef={mouseRef} />
          </Canvas>
        )}
      </div>

      <SectionFooter />
    </section>
  );
}
