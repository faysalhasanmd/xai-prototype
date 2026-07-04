import MetricsGrid from "./MetricsGrid";
import ThroughputChart from "./ThroughputChart";
import ModelWeightCard from "./ModelWeightCard";
import ExecutionLogsTable from "./ExecutionLogsTable";

export default function OverviewTab() {
  return (
    <>
      <MetricsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ThroughputChart />
        <ModelWeightCard />
      </div>
      <ExecutionLogsTable />
    </>
  );
}
