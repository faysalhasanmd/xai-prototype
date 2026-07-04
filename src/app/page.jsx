import IntelligenceDashboard from "@/components/dashboard/IntelligenceDashboard";
import WowMoment from "@/components/WowMoment";
import InsightFlow from "../components/Insightflow";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <InsightFlow />
      <IntelligenceDashboard />
      <WowMoment />
    </main>
  );
}
