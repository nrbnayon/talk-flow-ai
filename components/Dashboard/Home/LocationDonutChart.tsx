"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { locationStatsData } from "@/data";

export function LocationDonutChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray dark:bg-gray-800 p-6 rounded-md shadow-none border border-gray-100 dark:border-gray-700 h-full">
        <h3 className="text-lg font-semibold text-primary dark:text-gray-50 mb-6">
          Total earning by Location
        </h3>
        <div className="h-[150px] relative"></div>
        {/* Skeleton or empty placeholder could go here if needed, but keeping structure same for smooth transition */}
        <div className="mt-6 space-y-3">
          {/* If we want to hide legend too until mounted to prevent jumps, we can. 
                 But usually data is static so we can render legend. 
                 Problem is just ResponsiveContainer. */}
          {locationStatsData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(180deg, #000000 0%, #1C1C1C 100%)"
                        : item.color,
                  }}
                />
                <span className="text-secondary dark:text-gray-300">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-primary ">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray dark:bg-gray-800 p-6 rounded-md shadow-none border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-semibold text-primary dark:text-gray-50 mb-6">
        Total earning by Location
      </h3>

      <div className="h-[150px] relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <stop offset="100%" stopColor="#1C1C1C" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <Pie
              data={locationStatsData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              startAngle={-90}
              cornerRadius={4}
              endAngle={360}
              dataKey="value"
              stroke="none"
            >
              {locationStatsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {locationStatsData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(180deg, #000000 0%, #1C1C1C 100%)"
                      : item.color,
                }}
              />
              <span className="text-secondary dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <span className="font-medium text-primary ">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
