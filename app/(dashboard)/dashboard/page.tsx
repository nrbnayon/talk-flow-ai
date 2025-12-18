// ===== app/(dashboard)/dashboard/page.tsx =====
import DashboardHeader from "@/components/Dashboard/Shared/DashboardHeader";
import { StatsCard } from "@/components/Dashboard/Shared/StatsCard";
import { WeeklyActivityChart } from "@/components/Dashboard/Home/WeeklyActivityChart";
import { ClaimsTrendChart } from "@/components/Dashboard/Home/ClaimsTrendChart";
import { PendingClaimsList } from "@/components/Dashboard/Home/PendingClaimsList";
import { RecentActivityList } from "@/components/Dashboard/Home/RecentActivityList";
import { statsData } from "@/data/statsData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Admin Dashboard" 
        description="Welcome back! Here's an overview of your platform." 
      />
      
      {/* Stats Cards */}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WeeklyActivityChart />
          <ClaimsTrendChart />
        </div>

        {/* Lists Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PendingClaimsList />
          <RecentActivityList />
        </div>
      </div>
    </div>
  );
}