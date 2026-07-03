"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

const NODE_COUNT = 240;
const NEIGHBORS_PER_NODE = 3;
const SPHERE_RADIUS = 1.7;
const SCATTER_SPREAD = 5.5;

// --- Deterministic geometry helpers -----------------------------------
// Fibonacci sphere: distributes N points near-uniformly across a sphere
// using the golden angle. No randomness — same seed, same lattice, every
// time. This is the "settled" state the cluster resolves into.
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

// Scattered noise cloud: the "raw data" state before structure emerges.
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

// For every node on the settled sphere, connect it to its k nearest
// neighbours. This is what turns a point cloud into a graph.
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

  const colorChaos = useMemo(() => new THREE.Color("#4c1d95"), []);
  const colorOrder = useMemo(() => new THREE.Color("#22d3ee"), []);
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

      positions[i * 3] += (targetX - positions[i * 3]) * 0.06;
      positions[i * 3 + 1] += (targetY - positions[i * 3 + 1]) * 0.06;
      positions[i * 3 + 2] += (targetZ - positions[i * 3 + 2]) * 0.06;
    }
    posAttr.needsUpdate = true;

    // Edges follow the same settled/live positions of their endpoints
    const linePos = lineRef.current.geometry.attributes.position.array;
    for (let e = 0; e < edgeIndices.length; e++) {
      const idx = edgeIndices[e];
      linePos[e * 3] = positions[idx * 3];
      linePos[e * 3 + 1] = positions[idx * 3 + 1];
      linePos[e * 3 + 2] = positions[idx * 3 + 2];
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;

    // Color drifts from chaotic violet to resolved cyan as structure forms
    tmpColor.lerpColors(colorChaos, colorOrder, p);
    pointMatRef.current.color.copy(tmpColor);
    lineMatRef.current.color.copy(tmpColor);
    pointMatRef.current.opacity = 0.5 + p * 0.5;
    lineMatRef.current.opacity = 0.04 + p * 0.46;
    pointMatRef.current.size = 0.045 + p * 0.02;

    // Idle spin, amplified by scroll progress, plus subtle pointer parallax
    groupRef.current.rotation.y += delta * (0.06 + p * 0.12);
    groupRef.current.rotation.x +=
      (mouseRef.current.y * 0.25 - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z +=
      (mouseRef.current.x * 0.08 - groupRef.current.rotation.z) * 0.03;
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
          color="#4c1d95"
          transparent
          opacity={0.5}
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
          color="#4c1d95"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function WowMoment() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

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

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, sectionRef);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cheap DOM-write loop for the HUD readout — avoids re-rendering React
    // on every animation frame for numbers that only need to look "live."
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
          p < 0.15 ? "SCATTERED" : p < 0.65 ? "CLUSTERING" : "COHERENT";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [totalEdges]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#030303] relative overflow-hidden flex flex-col items-center justify-center px-6 py-24 font-sans"
    >
      {/* background texture, consistent with Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none z-0" />

      {/* corner HUD frame — reinforces "instrument panel" reading of the section */}
      <div className="pointer-events-none absolute inset-6 md:inset-10 border border-neutral-900 z-10">
        <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-indigo-500/60" />
        <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-indigo-500/60" />
        <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-indigo-500/60" />
        <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-indigo-500/60" />
      </div>

      <div
        className="text-indigo-400 text-xs font-mono font-medium tracking-[0.2em] uppercase mb-4 z-10"
        data-aos="fade-up"
      >
        Signature process · 04
      </div>

      <h2
        className="text-white text-3xl md:text-5xl font-medium tracking-tight text-center mb-3 z-10 max-w-2xl leading-[1.15]"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Every data point finds its place.
      </h2>
      <p
        className="text-neutral-500 text-sm md:text-base text-center max-w-md mb-12 font-light z-10"
        data-aos="fade-up"
        data-aos-delay="180"
      >
        240 nodes, scattered at rest. Scroll, and Xai resolves them into a
        single coherent structure in real time.
      </p>

      <div className="w-full max-w-3xl h-[26rem] md:h-[32rem] relative z-10">
        {ready && (
          <Canvas camera={{ position: [0, 0, 5.2], fov: 55 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.4} color="#6366f1" />
            <pointLight position={[-5, -3, 2]} intensity={1} color="#22d3ee" />
            <DataCluster progressRef={progressRef} mouseRef={mouseRef} />
          </Canvas>
        )}

        {/* HUD readout, overlaid on the canvas */}
        <div className="absolute top-0 left-0 font-mono text-[10px] md:text-xs text-neutral-500 tracking-wider space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-neutral-600 uppercase">State</span>
            <span ref={stateTextRef} className="text-indigo-300">
              SCATTERED
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-600 uppercase">Edges resolved</span>
            <span ref={edgeTextRef} className="text-neutral-300">
              0 / {totalEdges}
            </span>
          </div>
        </div>

        <div className="absolute top-0 right-0 text-right font-mono text-[10px] md:text-xs text-neutral-500 tracking-wider">
          <span className="text-neutral-600 uppercase block mb-1">
            Coherence
          </span>
          <span
            ref={coherenceTextRef}
            className="text-cyan-300 text-lg md:text-xl"
          >
            0%
          </span>
          <div className="w-24 md:w-28 h-[3px] bg-neutral-900 mt-2 ml-auto overflow-hidden rounded-full">
            <div
              ref={barRef}
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
