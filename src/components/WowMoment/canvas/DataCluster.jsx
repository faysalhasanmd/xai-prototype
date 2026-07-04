"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  NODE_COUNT,
  NEIGHBORS_PER_NODE,
  SPHERE_RADIUS,
  SCATTER_SPREAD,
  fibonacciSphere,
  scatterCloud,
  buildEdges,
} from "../utils/geometry";

/**
 * The 3D "coherence" visual: a scattered point cloud that resolves
 * into a Fibonacci-sphere lattice as `progressRef` goes 0 -> 1,
 * with connecting edges and a color shift from indigo to cyan.
 *
 * @param {{progressRef: React.MutableRefObject<number>, mouseRef: React.MutableRefObject<{x:number,y:number}>}} props
 */
export default function DataCluster({ progressRef, mouseRef }) {
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
