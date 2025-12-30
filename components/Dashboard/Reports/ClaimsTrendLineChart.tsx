"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", completed: 80, submitted: 70 },
  { month: "Feb", completed: 90, submitted: 85 },
  { month: "Mar", completed: 80, submitted: 82 },
  { month: "Apr", completed: 95, submitted: 88 },
  { month: "May", completed: 110, submitted: 92 },
  { month: "Jun", completed: 100, submitted: 90 },
  { month: "Jul", completed: 115, submitted: 105 },
  { month: "Aug", completed: 118, submitted: 108 },
  { month: "Sep", completed: 105, submitted: 100 },
  { month: "Oct", completed: 125, submitted: 115 },
  { month: "Nov", completed: 110, submitted: 105 },
  { month: "Dec", completed: 95, submitted: 90 },
];

export function ClaimsTrendLineChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-[#1A1C20] rounded-xl" />;

  return (
    <div className="bg-[#1A1C20] p-6 rounded-xl shadow-sm border border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Claims Trend</h3>
        <p className="text-sm text-gray-400">Monthly claims vs resolved cases</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              dy={10}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 30, 60, 90, 120]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              itemStyle={{ color: "#F9FAFB" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-gray-400 text-sm ml-1">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="submitted"
              name="Submitted"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
