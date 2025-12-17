"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Cell,
  YAxis,
} from "recharts";
import { monthlyViewsData } from "@/data";

export function MonthlyViewsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray dark:bg-gray-800 p-6 rounded-md shadow-none border border-gray-100 dark:border-gray-700 h-[400px]">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-primary dark:text-gray-50">
            Monthly Views
          </h3>
          <p className="text-sm text-secondary dark:text-gray-400">
            Viewers over last year
          </p>
        </div>
        <div className="w-full h-[85%]" />
      </div>
    );
  }
  return (
    <div className="bg-gray dark:bg-gray-800 p-6 rounded-md shadow-none border border-gray-100 dark:border-gray-700 h-[400px]">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary dark:text-gray-50">
          Monthly Views
        </h3>
        <p className="text-sm text-secondary dark:text-gray-400">
          Viewers over last year
        </p>
      </div>
      <ResponsiveContainer width="100%" height="85%" minWidth={0}>
        <BarChart data={monthlyViewsData} barGap={8}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            hide={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}K`}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          {/* Blue bars */}
          <Bar
            dataKey="current"
            fill="#3366D5"
            radius={[12, 12, 12, 12]}
            barSize={16}
          />
          {/* Dark bars */}
          <Bar
            dataKey="previous"
            fill="#3A3A3A"
            radius={[12, 12, 12, 12]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
