import { LayoutDashboard, Brain, Database, ShieldAlert } from "lucide-react";

export const TAB_COPY = {
  overview: {
    title: "System Intelligence Overview",
    description:
      "Real-time infrastructure modeling and model diagnostic interfaces.",
  },
  "ai-logs": {
    title: "AI Inference Logs",
    description: "Granular raw telemetry streams for LLM weight allocations.",
  },
  ingestion: {
    title: "Data Streams",
    description: "Live multi-protocol consumer buffer nodes.",
  },
  security: {
    title: "Threat Detection",
    description: "Heuristic vector anomaly analysis and model defense firewall.",
  },
};

// --- Static Mock Data ---
export const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "ai-logs", label: "AI Inference Logs", icon: Brain },
  { id: "ingestion", label: "Data Streams", icon: Database },
  { id: "security", label: "Threat Detection", icon: ShieldAlert, badge: "2" },
];

export const metrics = [
  {
    title: "Avg. Inference Latency",
    value: "42.8 ms",
    change: "-12.4%",
    isPositive: true,
    trend: "last 60m",
  },
  {
    title: "Model Accuracy Rate",
    value: "99.42%",
    change: "+0.08%",
    isPositive: true,
    trend: "vs yesterday",
  },
  {
    title: "Token Ingestion / sec",
    value: "14,820",
    change: "+8.2%",
    isPositive: true,
    trend: "live stream",
  },
  {
    title: "Anomalies Flagged",
    value: "3 Detected",
    change: "+1",
    isPositive: false,
    trend: "requires review",
  },
];

export const recentInferences = [
  {
    id: "INF-8492",
    pipeline: "Customer Sentiment",
    model: "Llama-3-70B",
    status: "Success",
    confidence: "98.2%",
    time: "2 mins ago",
  },
  {
    id: "INF-8491",
    pipeline: "Fraud Vector Analysis",
    model: "DeepSeek-R1",
    status: "Flagged",
    confidence: "91.4%",
    time: "5 mins ago",
  },
  {
    id: "INF-8490",
    pipeline: "Anomaly Detection",
    model: "Custom-CNN",
    status: "Success",
    confidence: "95.6%",
    time: "12 mins ago",
  },
  {
    id: "INF-8489",
    pipeline: "Supply Chain Predictor",
    model: "GPT-4o-mini",
    status: "Success",
    confidence: "89.1%",
    time: "18 mins ago",
  },
];

export const throughputSeries = [
  40, 55, 45, 60, 75, 50, 65, 80, 95, 70, 85, 60, 50, 65, 85, 100, 75, 90, 110,
  95,
];

export const modelTokenWeight = [
  { name: "Llama-3-70B", percentage: 54, color: "bg-cyan-500" },
  { name: "DeepSeek-R1", percentage: 28, color: "bg-purple-500" },
  { name: "Others / Custom", percentage: 18, color: "bg-slate-700" },
];

export const extendedAiLogs = [
  {
    id: "INF-9011",
    model: "DeepSeek-R1",
    inputTokens: 1024,
    outputTokens: 512,
    cost: "$0.0031",
    region: "us-east",
  },
  {
    id: "INF-9012",
    model: "Llama-3-70B",
    inputTokens: 2048,
    outputTokens: 128,
    cost: "$0.0015",
    region: "eu-west",
  },
  {
    id: "INF-9013",
    model: "GPT-4o-mini",
    inputTokens: 512,
    outputTokens: 1024,
    cost: "$0.0042",
    region: "ap-south",
  },
];

export const dataStreams = [
  {
    name: "Kafka-Ingest-Cluster",
    type: "Event Stream",
    status: "Active",
    rate: "4.8 MB/s",
    consumers: 12,
  },
  {
    name: "User-Activity-Webhook",
    type: "HTTP Push",
    status: "Active",
    rate: "1.2 MB/s",
    consumers: 4,
  },
  {
    name: "Database-CDC-Pipeline",
    type: "CDC / SQL",
    status: "Idle",
    rate: "0 KB/s",
    consumers: 1,
  },
];

export const securityThreats = [
  {
    id: "TR-402",
    severity: "High",
    vector: "Prompt Injection Attack",
    origin: "192.168.1.105",
    status: "Blocked",
  },
  {
    id: "TR-403",
    severity: "Critical",
    vector: "Model Parameter Exfiltration",
    origin: "45.22.11.89",
    status: "Investigating",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
