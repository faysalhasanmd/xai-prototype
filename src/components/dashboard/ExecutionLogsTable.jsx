import { motion } from "framer-motion";
import { recentInferences, itemVariants } from "@/lib/dashboard-data";

export default function ExecutionLogsTable() {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-900/20 border border-slate-900 rounded-xl overflow-hidden"
    >
      <div className="p-5 border-b border-slate-900 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Live Execution Logs
        </h3>
        <span className="flex items-center gap-1.5 text-xxs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono">
          <span className="w-1 h-1 rounded-full bg-emerald-400" /> Streaming Live
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-900 text-slate-500 font-medium bg-slate-950/40">
              <th className="p-4 font-mono">Inference ID</th>
              <th className="p-4">Pipeline</th>
              <th className="p-4">Target Core Model</th>
              <th className="p-4 text-right">Confidence</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right text-slate-600">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 font-medium text-slate-300">
            {recentInferences.map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/30 transition-colors group">
                <td className="p-4 font-mono text-cyan-500 group-hover:text-cyan-400 transition-colors">
                  {log.id}
                </td>
                <td className="p-4 text-slate-200">{log.pipeline}</td>
                <td className="p-4 text-slate-400 font-mono text-xxs">{log.model}</td>
                <td className="p-4 text-right font-mono text-slate-400">{log.confidence}</td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xxs font-semibold tracking-wide ${
                      log.status === "Success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-500 text-xxs font-mono">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
