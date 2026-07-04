import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { metrics, itemVariants } from "@/lib/dashboard-data";

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ y: -2, borderColor: "rgba(51, 65, 85, 0.7)" }}
          className="bg-slate-900/20 border border-slate-900 p-5 rounded-xl transition-colors duration-200"
        >
          <p className="text-xs font-medium text-slate-500 tracking-wide">{metric.title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-semibold tracking-tight text-slate-200 font-mono">
              {metric.value}
            </span>
            <span
              className={`text-xs font-medium flex items-center ${
                metric.isPositive ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {metric.isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {metric.change}
            </span>
          </div>
          <p className="text-xxs text-slate-600 mt-1 font-mono uppercase tracking-wider">
            {metric.trend}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
