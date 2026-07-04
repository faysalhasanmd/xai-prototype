/**
 * Top title block for the WowMoment section.
 */
export default function SectionHeader() {
  return (
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
  );
}
