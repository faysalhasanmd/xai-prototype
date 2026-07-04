/**
 * Bottom technical status strip.
 */
export default function SectionFooter() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-neutral-900 pt-4 z-10 text-[9px] sm:text-[10px] md:text-xs font-mono text-neutral-600 tracking-widest uppercase text-center sm:text-left">
      <div className="hidden md:block">[ System: Live Data Matrix ]</div>
      <div className="animate-pulse text-neutral-400 md:text-neutral-500">
        [ Scroll / Swipe to Synchronize ]
      </div>
      <div>[ Node_Count: 240 ]</div>
    </div>
  );
}
