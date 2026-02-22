/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Used Courses", value: 84 },
  { name: "Unused Courses", value: 16 },
];

const COLORS = ["#1abc9c", "#ff6b6b"];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">
          {payload[0].name}
        </p>
        <p className="text-sm font-semibold text-primary">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage({ overview }: any) {
  console.log("overview", overview);

  return (
    <main className="py-8 rounded-2xl bg-background">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-foreground">
                Course Usage Analytics
              </h1>
            </div>

            {/* Chart Container */}
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => (
                      <text className="fill-foreground text-sm font-medium">
                        {name}: {value}%
                      </text>
                    )}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry: any) => (
                      <span className="text-sm font-medium text-foreground">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Used Courses</p>
                  <p className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-[#1abc9c]"></span>
                    <span className="text-3xl font-bold text-foreground">
                      84%
                    </span>
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Unused Courses
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-[#ff6b6b]"></span>
                    <span className="text-3xl font-bold text-foreground">
                      16%
                    </span>
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
