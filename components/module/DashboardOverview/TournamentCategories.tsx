/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#06B6D4", // cyan
];

interface CategoryItem {
  name: string;
  value: number;
}

export const TournamentCategoriesBreakdown = ({
  data,
}: {
  data: CategoryItem[];
}) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCenterLabel = ({ cx, cy }: any) => (
    <g>
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        className="text-2xl font-bold fill-gray-900"
      >
        {total.toFixed(0)}%
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        className="text-sm fill-gray-500"
      >
        Categories
      </text>
    </g>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tournament Categories
      </h3>

      <div className="w-full h-[260px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as any}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={4}
              label={renderCenterLabel}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentCategoriesBreakdown;
