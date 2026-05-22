import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2800 },
  { month: "May", value: 2000 },
  { month: "Jun", value: 2500 },
  { month: "Jul", value: 3500 },
];

const TrafficChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#1D9E75" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(136,135,128,0.2)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#888780", fontSize: 13 }}
        />
        <YAxis
          domain={[0, 10000]}
          ticks={[0, 2500, 5000, 7500, 10000]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#888780", fontSize: 13 }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1D9E75"
          strokeWidth={2}
          fill="url(#trafficGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "#1D9E75", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
