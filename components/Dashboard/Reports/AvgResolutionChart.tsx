"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", days: 4.2 },
  { day: "Tue", days: 3.8 },
  { day: "Wed", days: 4.5 },
  { day: "Thu", days: 3.9 },
  { day: "Fri", days: 4.1 },
  { day: "Sat", days: 5.2 },
  { day: "Sun", days: 5.8 },
];

export function AvgResolutionChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-[#1A1C20] rounded-xl" />;

  return (
    <div className="bg-[#1A1C20] p-6 rounded-xl shadow-sm border border-gray-800">
      <div className="mb-6">
         <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-semibold text-white">Average Resolution Time</h3>
                <p className="text-sm text-gray-400">Daily average claim processing time (in days)</p>
            </div>
         </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={true} horizontal={true} />
            <XAxis
              dataKey="day"
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={true}
              dy={10}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              itemStyle={{ color: "#F9FAFB" }}
              formatter={(value) => [`${value} days`]}
            />
            
            <Line
              type="monotone"
              dataKey="days"
              stroke="#F3F4F6"
              strokeWidth={2}
              dot={{ fill: "#F3F4F6", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            {/* Custom Legend at bottom like design */}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center -mt-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"/>
                <span className="text-sm text-gray-300">Avg Days to Resolve</span>
            </div>
        </div>
      </div>
    </div>
  );
}
