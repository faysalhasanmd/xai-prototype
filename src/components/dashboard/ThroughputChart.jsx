import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { throughputSeries, itemVariants } from "@/lib/dashboard-data";

export default function ThroughputChart() {
  return (
    <motion.div
      variants={itemVariants}
      className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-xl p-5 flex flex-col justify-between h-80"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Inference Throughput Volume
          </h3>
        </div>
        <span className="text-xxs text-slate-500 font-mono">10s Intervals</span>
      </div>

      <div className="h-48 flex items-end gap-1 sm:gap-1.5 pt-4 px-2 border-b border-l border-slate-900/60 overflow-visible">
        {throughputSeries.map((val, idx) => (
          <div
            key={idx}
            className="flex-1 bg-slate-900 rounded-t-sm relative group h-full flex items-end overflow-visible"
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-800 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 whitespace-nowrap flex flex-col items-center gap-0.5 min-w-[55px]">
              <span className="text-xxs font-mono font-bold text-cyan-400">{val * 12} inf/s</span>
              <span className="text-[9px] text-slate-500 font-mono">Step {idx + 1}</span>
              <div className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-slate-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ delay: idx * 0.015, duration: 0.5, ease: "easeOut" }}
              className="w-full bg-gradient-to-t from-slate-900 via-cyan-950/40 to-cyan-500/80 rounded-t-sm group-hover:to-cyan-400 transition-all duration-150 relative z-10"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xxs text-slate-600 font-mono mt-2">
        <span>20:45</span>
        <span className="hidden sm:inline">20:50</span>
        <span className="hidden sm:inline">20:55</span>
        <span>21:00 (Current)</span>
      </div>
    </motion.div>
  );
}
