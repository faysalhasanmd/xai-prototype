"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the section while scrolling and drives `progressRef` from 0 to 1,
 * plus staggers in any `.reveal-item` elements within the section.
 *
 * @param {React.RefObject<HTMLElement>} sectionRef
 * @param {React.MutableRefObject<number>} progressRef
 */
export function useWowMomentScroll(sectionRef, progressRef) {
  useEffect(() => {
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

    return () => ctx.revert();
  }, [sectionRef, progressRef]);
}
