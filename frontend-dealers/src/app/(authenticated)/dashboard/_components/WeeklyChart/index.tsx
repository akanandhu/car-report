import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 11 },
  { day: "Tue", value: 19 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 28 },
  { day: "Sat", value: 11 },
  { day: "Sun", value: 6 },
];

const WeeklyChart = () => {
  return (
    <div className="h-60 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 4, left: -18, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(136,135,128,0.2)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888780", fontSize: 11 }}
          />
          <YAxis
            width={40}
            domain={[0, 36]}
            ticks={[0, 9, 18, 27, 36]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888780", fontSize: 11 }}
          />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="rgba(174,191,215,0.6)"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
