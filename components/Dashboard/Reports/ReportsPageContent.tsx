"use client";

import DashboardHeader from "../Shared/DashboardHeader";
import { StatsCard } from "../Shared/StatsCard";
import { ClaimsTrendLineChart } from "./ClaimsTrendLineChart";
import { ClaimsByTypeChart } from "./ClaimsByTypeChart";
import { AvgTimeSignChart } from "./AvgTimeSignChart";
import { AvgResolutionChart } from "./AvgResolutionChart";
import {
  GoogleDocIcon,
  AnalyticsUpIcon,
  Time01Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons";

export function ReportsPageContent() {
  const stats = [
    {
      label: "Total Claims",
      value: "2,847",
      trend: 8.5,
      icon: GoogleDocIcon,
    },
    {
      label: "Claim Success Rate",
      value: "88.0%",
      trend: 8.5,
      icon: AnalyticsUpIcon,
    },
    {
      label: "Avg. Processing Time",
      value: "4.2 days",
      trend: 8.5,
      icon: Time01Icon,
    },
    {
      label: "Document Signed",
      value: "92%",
      trend: 8.5,
      icon: CheckmarkCircle02Icon,
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Reports & Analytics"
        description="Insights and metrics across your platform"
      />

      <div className="p-4 md:p-8 w-full mx-auto space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendLabel="Up from last month"
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClaimsTrendLineChart />
            <ClaimsByTypeChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AvgTimeSignChart />
            <AvgResolutionChart />
        </div>
      </div>
    </>
  );
}
