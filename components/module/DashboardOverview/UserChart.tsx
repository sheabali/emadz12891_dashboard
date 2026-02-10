/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueItem {
  name: string;
  value: number;
}

export const RevenueGrowthChart = ({ data }: { data: RevenueItem[] }) => {
  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    month: item.name,
    revenue: item.value,
  }));

  return (
    <div className="bg-white border-0 shadow-lg p-6 rounded-2xl h-full w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Revenue Growth
      </h3>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 0, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(label) => `Month: ${label}`}
              formatter={(value: any) => [`$${value.toFixed(2)}`, "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
