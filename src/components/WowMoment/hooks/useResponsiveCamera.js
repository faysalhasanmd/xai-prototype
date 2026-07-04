"use client";

import { useState, useEffect } from "react";

/**
 * Returns a camera Z distance tuned so the 3D cluster fits nicely
 * at mobile / tablet / desktop widths, and keeps it updated on resize.
 */
export function useResponsiveCamera() {
  const [cameraZ, setCameraZ] = useState(5.2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(6.5); // Mobile - move camera back so object fits
      } else if (window.innerWidth < 1024) {
        setCameraZ(5.5); // Tablet
      } else {
        setCameraZ(4.8); // Large desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cameraZ;
}
