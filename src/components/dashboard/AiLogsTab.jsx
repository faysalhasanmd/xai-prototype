import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { extendedAiLogs, itemVariants } from "@/lib/dashboard-data";

export default function AiLogsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {extendedAiLogs.map((log) => (
        <motion.div
          key={log.id}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-xs text-slate-200">{log.id}</span>
            </div>
            <span className="text-xxs font-mono text-slate-500 uppercase">{log.region}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Engine Model:</span>
              <span className="font-mono text-slate-300">{log.model}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Token Burden:</span>
              <span className="text-slate-300">
                {log.inputTokens} &rarr; {log.outputTokens}
              </span>
            </div>
            <div className="w-full h-[2px] bg-slate-900 my-1" />
            <div className="flex justify-between text-xs items-center">
              <span className="text-slate-500">Calculated Cost:</span>
              <span className="text-emerald-400 font-mono font-semibold">{log.cost}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
