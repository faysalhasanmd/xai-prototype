import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { dataStreams, itemVariants } from "@/lib/dashboard-data";

export default function IngestionTab() {
  return (
    <div className="space-y-4">
      {dataStreams.map((stream) => (
        <motion.div
          key={stream.name}
          variants={itemVariants}
          className="bg-slate-900/10 border border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center">
              <Radio className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">{stream.name}</h4>
              <p className="text-xxs text-slate-500 mt-0.5">{stream.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right font-mono">
              <p className="text-xs text-slate-300 font-semibold">{stream.rate}</p>
              <p className="text-[10px] text-slate-600 uppercase">Velocity</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-300 font-mono">{stream.consumers} active</p>
              <p className="text-[10px] text-slate-600 uppercase">Consumers</p>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-xxs font-medium ${
                stream.status === "Active"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-800 text-slate-500 border border-slate-700/50"
              }`}
            >
              {stream.status}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
