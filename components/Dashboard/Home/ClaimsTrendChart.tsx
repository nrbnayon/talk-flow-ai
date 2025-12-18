// ===== components/Dashboard/Home/ClaimsTrendChart.tsx =====
'use client'

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ClaimsTrendChartProps {
  className?: string;
}

const claimsData = [
  { name: 'Completed', value: 55, color: '#B37EFF' },
  { name: 'In Progress', value: 30, color: '#7DBBFF' },
  { name: 'Pending', value: 9, color: '#71DD8C' },
  { name: 'Rejected', value: 6, color: '#FF3776' }
];

export function ClaimsTrendChart({ className }: ClaimsTrendChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const legendItems = [
    { label: 'Completed', value: '55%', color: '#B37EFF' },
    { label: 'In Progress', value: '30%', color: '#7DBBFF' },
    { label: 'Pending', value: '9%', color: '#71DD8C' },
    { label: 'Rejected', value: '6%', color: '#FF3776' }
  ];

  if (!mounted) {
    return (
      <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Claims Trend - This Week</h3>
          <p className="text-sm text-secondary mt-1">Daily claim submissions and completions</p>
        </div>
        <div className="h-[200px] relative"></div>
        <div className="mt-6 space-y-3">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-secondary">{item.label}</span>
              </div>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Claims Trend - This Week</h3>
        <p className="text-sm text-secondary mt-1">Daily claim submissions and completions</p>
      </div>
      
      <div className="flex items-center justify-center gap-12">
        <div className="h-[280px] w-[280px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={claimsData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={4}
                startAngle={-90}
                cornerRadius={4}
                endAngle={270}
                dataKey="value"
                stroke="none"
              >
                {claimsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  color: '#111827'
                }}
                itemStyle={{ color: '#111827' }}
                labelStyle={{ color: '#111827' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-foreground text-base font-medium whitespace-nowrap">
                {item.label} {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}