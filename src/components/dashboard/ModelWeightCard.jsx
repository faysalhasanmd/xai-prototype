import { motion } from "framer-motion";
import { BarChart3, ChevronRight } from "lucide-react";
import { modelTokenWeight, itemVariants } from "@/lib/dashboard-data";

export default function ModelWeightCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 flex flex-col justify-between"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Model Token Weight
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Current global resource load distribution scaled across live infrastructure
          cluster pipelines.
        </p>
      </div>

      <div className="space-y-3 my-4">
        {modelTokenWeight.map((model, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xxs text-slate-400 font-mono">
              <span>{model.name}</span>
              <span>{model.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${model.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${model.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1">
        View Allocation Matrix <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
