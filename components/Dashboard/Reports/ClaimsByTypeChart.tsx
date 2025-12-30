"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Property", value: 43, color: "#A855F7" }, // Purple
  { name: "Health", value: 37, color: "#3B82F6" },   // Blue
  { name: "Auto", value: 22, color: "#22C55E" },     // Green
  { name: "Other", value: 6, color: "#EC4899" },     // Pink
];

export function ClaimsByTypeChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-[#1A1C20] rounded-xl" />;

  return (
    <div className="bg-[#1A1C20] p-6 rounded-xl shadow-sm border border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Claims by Type</h3>
        <p className="text-sm text-gray-400">Distribution of claim categories</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-[300px]">
        <div className="h-[250px] w-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                startAngle={-90}
                cornerRadius={4}
                endAngle={270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text (Optional based on design) - Design shows donut hole empty but typically one might put total. Design shows empty. */}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300 text-sm">
                {item.name} <span className="text-white font-medium ml-1">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
