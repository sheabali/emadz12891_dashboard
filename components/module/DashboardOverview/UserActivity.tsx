"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UserActivityProps {
  data: {
    name: string;
    managers: number;
    players: number;
  }[];
}

const UserActivity = ({ data }: UserActivityProps) => {
  return (
    <Card className="bg-white py-[60px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          User Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis hide />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="managers"
                name="Managers"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="players"
                name="Players"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;
