"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Particle cloud that morphs from a "raw scattered" state into a
 * "structured grid" state as the page scrolls, and gently follows
 * the pointer/touch position.
 *
 * @param {{scrollProgress: React.MutableRefObject<number>, mouse: React.MutableRefObject<{x:number,y:number}>, count: number}} props
 */
export default function ParticleField({ scrollProgress, mouse, count }) {
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

      // Color mapping interpolation matching reference image
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
