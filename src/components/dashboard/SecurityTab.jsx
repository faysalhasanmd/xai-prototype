import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { securityThreats, itemVariants } from "@/lib/dashboard-data";

export default function SecurityTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {securityThreats.map((threat) => (
        <motion.div
          key={threat.id}
          variants={itemVariants}
          className="bg-slate-900/20 border border-rose-950/30 rounded-xl p-5 border-l-2 border-l-rose-500"
        >
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="font-mono text-xs font-bold text-rose-400">
                {threat.severity} Severity Threat
              </span>
            </div>
            <span className="text-xxs font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
              {threat.id}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Attack Vector</p>
              <p className="text-xs font-medium text-slate-200 mt-0.5">{threat.vector}</p>
            </div>
            <div className="flex justify-between pt-2">
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Origin IP Address</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{threat.origin}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase">Mitigation Status</p>
                <span className="inline-block mt-1 text-xxs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-medium">
                  {threat.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
