// ===== components/Dashboard/Home/WeeklyActivityChart.tsx =====
'use client'

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeeklyActivityChartProps {
  className?: string;
}

const weeklyData = [
  { day: 'Mon', newCases: 140, aiCalls: 100 },
  { day: 'Tue', newCases: 180, aiCalls: 110 },
  { day: 'Wed', newCases: 200, aiCalls: 105 },
  { day: 'Thu', newCases: 160, aiCalls: 100 },
  { day: 'Fri', newCases: 220, aiCalls: 120 },
  { day: 'Sat', newCases: 120, aiCalls: 95 },
  { day: 'Sun', newCases: 120, aiCalls: 85 },
];

export function WeeklyActivityChart({ className }: WeeklyActivityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity Trend</h3>
          <p className="text-sm text-secondary mt-1">AI calls and new cases over the past week</p>
        </div>
        <div style={{ height: '300px' }} className="flex items-center justify-center">
          <div className="animate-pulse text-secondary">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray rounded-md p-6 ${className}`} style={{ boxShadow: "6px 6px 40px 0px #00000014" }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Weekly Activity Trend</h3>
        <p className="text-sm text-secondary mt-1">AI calls and new cases over the past week</p>
      </div>
      <div style={{ height: '300px', marginLeft: '-20px' }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#6B7280" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              stroke="#6B7280" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={false}
              domain={[0, 220]}
              ticks={[0, 55, 110, 165, 220]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#F9FAFB'
              }}
              labelStyle={{ color: '#F9FAFB' }}
              itemStyle={{ color: '#F9FAFB' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="newCases" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              name="New Cases"
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="aiCalls" 
              stroke="#06B6D4" 
              strokeWidth={2}
              dot={{ fill: '#06B6D4', r: 4 }}
              name="AI Calls"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}