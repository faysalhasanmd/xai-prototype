import { Database, Cpu, Sparkles } from "lucide-react";
export const stages = [
  {
    id: 1,
    title: "Ingest Data",
    description:
      "Seamlessly aggregate multi-source data streams into a unified data lake with real-time validation.",
    extendedDesc:
      "Connect to Kafka clusters, AWS S3, or REST webhooks instantly. Automated schema registry checks ensure zero data corruption during high-throughput enterprise ingestion cycles.",
    icon: Database,
    accent: "#22d3ee",
    accentSoft: "rgba(34, 211, 238, 0.05)",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Analyze with AI",
    description:
      "Deep neural networks parse complex datasets to extract hidden patterns, anomalies, and correlations.",
    extendedDesc:
      "Leverage automated LLM fine-tuning and localized neural mapping. Detect critical pipeline anomalies and multi-variate behavioral metrics within sub-millisecond windows.",
    icon: Cpu,
    accent: "#a78bfa",
    accentSoft: "rgba(167, 139, 250, 0.05)",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    id: 3,
    title: "Generate Insight",
    description:
      "Transform raw analytical intelligence into predictive, actionable strategies for automated execution.",
    extendedDesc:
      "Deploy production-ready predictive models directly to your operations ecosystem. Drive corporate growth via autonomous API webhooks and automated trigger routines.",
    icon: Sparkles,
    accent: "#fbbf24",
    accentSoft: "rgba(251, 191, 36, 0.05)",
    gradient: "from-amber-400 to-orange-500",
  },
];
