/**
 * Bottom-left "lab" readout: current lattice state label and
 * resolved-vector counter, driven externally via refs.
 *
 * @param {{stateTextRef: React.RefObject<HTMLElement>, edgeTextRef: React.RefObject<HTMLElement>, totalEdges: number}} props
 */
export default function LeftHUD({ stateTextRef, edgeTextRef, totalEdges }) {
  return (
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
  );
}
