import * as THREE from "three";

export const NODE_COUNT = 240;
export const NEIGHBORS_PER_NODE = 3;
export const SPHERE_RADIUS = 1.7;
export const SCATTER_SPREAD = 5.5;

/**
 * Distributes `count` points evenly on a sphere surface using the
 * golden-angle (Fibonacci) spiral method.
 */
export function fibonacciSphere(count, radius) {
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

/**
 * Generates `count` randomly scattered points within a cube of
 * side length `spread`, used as the "chaotic" starting state.
 */
export function scatterCloud(count, spread) {
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

/**
 * Builds a deduplicated nearest-neighbor edge list (k neighbors per
 * node) from a set of 3D points. Returns a flat array of point
 * indices, where each consecutive pair [i, j] is one edge.
 */
export function buildEdges(spherePts, k) {
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
