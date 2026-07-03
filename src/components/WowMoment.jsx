"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODE_COUNT = 240;
const NEIGHBORS_PER_NODE = 3;
const SPHERE_RADIUS = 1.7;
const SCATTER_SPREAD = 5.5;

// --- Mathematical Core Helpers ---
function fibonacciSphere(count, radius) {
  const pts = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r,
      ).multiplyScalar(radius),
    );
  }
  return pts;
}

function scatterCloud(count, spread) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    pts.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ),
    );
  }
  return pts;
}

function buildEdges(spherePts, k) {
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < spherePts.length; i++) {
    const dists = [];
    for (let j = 0; j < spherePts.length; j++) {
      if (i === j) continue;
      dists.push([j, spherePts[i].distanceToSquared(spherePts[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < k; n++) {
      const j = dists[n][0];
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push(i, j);
      }
    }
  }
  return edges;
}

function DataCluster({ progressRef, mouseRef }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const lineRef = useRef();
  const pointMatRef = useRef();
  const lineMatRef = useRef();

  const {
    scatter,
    sphere,
    edgeIndices,
    initialPositions,
    initialLinePositions,
  } = useMemo(() => {
    const sphere = fibonacciSphere(NODE_COUNT, SPHERE_RADIUS);
    const scatter = scatterCloud(NODE_COUNT, SCATTER_SPREAD);
    const edgeIndices = buildEdges(sphere, NEIGHBORS_PER_NODE);

    const initialPositions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      initialPositions[i * 3] = scatter[i].x;
      initialPositions[i * 3 + 1] = scatter[i].y;
      initialPositions[i * 3 + 2] = scatter[i].z;
    }

    const initialLinePositions = new Float32Array(edgeIndices.length * 3);
    return {
      scatter,
      sphere,
      edgeIndices,
      initialPositions,
      initialLinePositions,
    };
  }, []);

  const colorChaos = useMemo(() => new THREE.Color("#6366f1"), []);
  const colorOrder = useMemo(() => new THREE.Color("#06b6d4"), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const p = progressRef.current;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array;

    for (let i = 0; i < NODE_COUNT; i++) {
      const sx = scatter[i].x,
        sy = scatter[i].y,
        sz = scatter[i].z;
      const tx = sphere[i].x,
        ty = sphere[i].y,
        tz = sphere[i].z;

      const targetX = sx + (tx - sx) * p;
      const targetY = sy + (ty - sy) * p;
      const targetZ = sz + (tz - sz) * p;

      positions[i * 3] += (targetX - positions[i * 3]) * 0.08;
      positions[i * 3 + 1] += (targetY - positions[i * 3 + 1]) * 0.08;
      positions[i * 3 + 2] += (targetZ - positions[i * 3 + 2]) * 0.08;
    }
    posAttr.needsUpdate = true;

    const linePos = lineRef.current.geometry.attributes.position.array;
    for (let e = 0; e < edgeIndices.length; e++) {
      const idx = edgeIndices[e];
      linePos[e * 3] = positions[idx * 3];
      linePos[e * 3 + 1] = positions[idx * 3 + 1];
      linePos[e * 3 + 2] = positions[idx * 3 + 2];
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;

    tmpColor.lerpColors(colorChaos, colorOrder, p);
    pointMatRef.current.color.copy(tmpColor);
    lineMatRef.current.color.copy(tmpColor);
    pointMatRef.current.opacity = 0.4 + p * 0.6;
    lineMatRef.current.opacity = 0.03 + p * 0.57;
    pointMatRef.current.size = 0.045 + p * 0.025;

    groupRef.current.rotation.y += delta * (0.08 + p * 0.15);
    groupRef.current.rotation.x +=
      (mouseRef.current.y * 0.35 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z +=
      (mouseRef.current.x * 0.15 - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={initialPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointMatRef}
          size={0.045}
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgeIndices.length}
            array={initialLinePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function WowMoment() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [ready, setReady] = useState(false);
  const [cameraZ, setCameraZ] = useState(5.2); // Screen size variable for camera fallback

  const coherenceTextRef = useRef(null);
  const stateTextRef = useRef(null);
  const edgeTextRef = useRef(null);
  const barRef = useRef(null);

  const totalEdges = useMemo(
    () =>
      buildEdges(fibonacciSphere(NODE_COUNT, 1), NEIGHBORS_PER_NODE).length / 2,
    [],
  );

  useEffect(() => {
    setReady(true);

    // Screen dimension response calculation
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(6.5); // Mobile (Move camera back so 3D object fits)
      } else if (window.innerWidth < 1024) {
        setCameraZ(5.5); // Tablet
      } else {
        setCameraZ(4.8); // Large Desktop
      }
    };

    handleResize(); // trigger initial run
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    // Handling both Mouse and Mobile Touch moves smoothly
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

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(raf);
    };
  }, [totalEdges]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#030303] relative overflow-hidden flex flex-col justify-between py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none z-0" />

      {/* Top Header Information Stack */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 z-10">
        <div className="space-y-1 sm:space-y-2 max-w-xl">
          <div className="reveal-item flex items-center gap-2 text-cyan-400 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 animate-pulse rounded-full" />
            Signature System · 04
          </div>
          <h2 className="reveal-item text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] lg:leading-[1.1]">
            Deterministic{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-white to-neutral-500">
              Coherence.
            </span>
          </h2>
        </div>
        <p className="reveal-item text-neutral-400 font-mono text-[11px] sm:text-xs md:text-sm max-w-xs lg:max-w-sm leading-relaxed lg:border-l lg:border-neutral-800 lg:pl-4">
          240 messy nodes distributed via gold-ratio lattice. Scroll down to
          resolve chaos into structural architecture.
        </p>
      </div>

      {/* Main Responsive Glass Workspace Container */}
      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto flex-1 my-4 sm:my-6 md:my-8 relative rounded-xl sm:rounded-2xl border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md overflow-hidden shadow-[0_0_50px_-25px_rgba(6,182,212,0.15)] z-10 min-h-[340px] sm:min-h-[400px] md:min-h-[450px]"
      >
        {/* Lab HUD Overlay Left - Fully Absolute and flex shifts on mobile */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-mono text-[10px] sm:text-[11px] tracking-wider text-neutral-400 space-y-2 sm:space-y-3 z-20 bg-black/50 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-white/[0.03] backdrop-blur-md max-w-[140px] sm:max-w-none">
          <div className="flex flex-col gap-0.5">
            <span className="text-neutral-600 text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
              Lattice Engine
            </span>
            <span
              ref={stateTextRef}
              className="text-indigo-400 font-bold tracking-widest truncate"
            >
              SCATTERED
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-neutral-600 text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
              Resolved Vectors
            </span>
            <span ref={edgeTextRef} className="text-neutral-200 font-medium">
              0 / {totalEdges}
            </span>
          </div>
        </div>

        {/* Lab HUD Overlay Right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 font-mono text-[10px] sm:text-[11px] tracking-wider text-right text-neutral-400 space-y-1.5 sm:space-y-2 z-20 bg-black/50 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-white/[0.03] backdrop-blur-md w-28 sm:w-36 md:w-44">
          <div>
            <span className="text-neutral-600 text-[8px] sm:text-[9px] uppercase block mb-0.5 tracking-widest font-bold">
              System Integrity
            </span>
            <span
              ref={coherenceTextRef}
              className="text-cyan-400 text-lg sm:text-xl md:text-2xl font-bold font-sans"
            >
              0%
            </span>
          </div>
          <div className="w-full h-[3px] sm:h-[4px] bg-neutral-900 overflow-hidden rounded-full border border-white/[0.02]">
            <div
              ref={barRef}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-75 ease-out"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Laboratory Framing HUD Borders */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20" />
          <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20" />
          <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20" />
          <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20" />
        </div>

        {/* Responsive 3D Core Canvas Layer */}
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

      {/* Bottom Technical Grid Footer */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-neutral-900 pt-4 z-10 text-[9px] sm:text-[10px] md:text-xs font-mono text-neutral-600 tracking-widest uppercase text-center sm:text-left">
        <div className="hidden md:block">[ System: Live Data Matrix ]</div>
        <div className="animate-pulse text-neutral-400 md:text-neutral-500">
          [ Scroll / Swipe to Synchronize ]
        </div>
        <div>[ Node_Count: 240 ]</div>
      </div>
    </section>
  );
}
