/**
 * Bottom-right "lab" readout: system integrity percentage and a
 * progress bar, driven externally via refs.
 *
 * @param {{coherenceTextRef: React.RefObject<HTMLElement>, barRef: React.RefObject<HTMLElement>}} props
 */
export default function RightHUD({ coherenceTextRef, barRef }) {
  return (
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
  );
}
