import { StatsCard } from "@/components/Dashboard/Shared/StatsCard";

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        label="Views"
        value="3,671"
        trend={-0.03}
        trendLabel="vs last month"
      />
      <StatsCard
        label="New Users"
        value="156"
        trend={15.03}
        trendLabel="vs last month"
      />
      <StatsCard
        label="Active Users"
        value="2,318"
        trend={6.08}
        trendLabel="vs last month"
      />
    </div>
  );
}
