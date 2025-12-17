import { ActivityOverviewSection } from "@/components/Dashboard/Home/ActivityOverviewSection";
import DashboardHeader from "@/components/Dashboard/Shared/DashboardHeader";
import { StatsCard } from "@/components/Dashboard/Shared/StatsCard";
import { statsData } from "@/data/statsData";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader 
        title="Admin Dashboard" 
        description="Welcome back! Here's an overview of your platform" 
      />
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendLabel={stat.trendLabel}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
      <ActivityOverviewSection/>
    </div>
  );
}