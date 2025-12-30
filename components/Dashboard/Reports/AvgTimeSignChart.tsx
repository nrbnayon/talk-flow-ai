"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { category: "Claim Forms", hours: 16 },
  { category: "Authorizations", hours: 12 },
  { category: "Medical Records", hours: 8 },
  { category: "Compliance", hours: 4 },
];

export function AvgTimeSignChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-[#1A1C20] rounded-xl" />;

  return (
    <div className="bg-[#1A1C20] p-6 rounded-xl shadow-sm border border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Average Time to Sign</h3>
        <p className="text-sm text-gray-400">By document category (in hours)</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis 
                type="number" 
                stroke="#6B7280"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={{ stroke: "#374151" }}
                tickLine={false}
                domain={[0, 20]}
                ticks={[0, 4, 8, 12, 16, 20]}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value) => [`${value} hours`]}
            />
            <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#C084FC" /> // Light purple
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
