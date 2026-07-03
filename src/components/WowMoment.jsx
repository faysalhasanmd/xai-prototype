"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function IntelligenceCore({ scrollState }) {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    // base idle rotation
    meshRef.current.rotation.y += delta * 0.15;
    innerRef.current.rotation.x += delta * 0.1;

    // scroll-driven extra rotation + scale "reorganize" feel
    const p = scrollState.current;
    meshRef.current.rotation.x = p * Math.PI * 0.6;
    meshRef.current.rotation.z = p * Math.PI * 0.3;

    const scale = 1 + p * 0.4;
    meshRef.current.scale.set(scale, scale, scale);

    innerRef.current.rotation.y -= delta * 0.2;
    innerRef.current.scale.set(1 - p * 0.3, 1 - p * 0.3, 1 - p * 0.3);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function WowMoment() {
  const sectionRef = useRef(null);
  const scrollState = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          scrollState.current = self.progress;
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-4 z-10"
      >
        Powered by intelligence
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-white text-3xl md:text-4xl font-semibold text-center mb-10 z-10"
      >
        Watch data become decisions
      </motion.h2>

      <div className="w-full max-w-2xl h-[28rem]">
        {ready && (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
            <pointLight position={[-5, -3, 2]} intensity={1} color="#22d3ee" />
            <IntelligenceCore scrollState={scrollState} />
          </Canvas>
        )}
      </div>
    </section>
  );
}
