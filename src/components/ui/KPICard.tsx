import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

type KPICardProps = {
  title: string;
  value: string;
  trend?: "up" | "down";
  trendData?: number[];
};

const KPICard = ({ title, value, trend, trendData = [] }: KPICardProps) => {
  const chartData = trendData.map((v, i) => ({ value: v, i }));

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#151516] p-5 shadow-sm">
      {/* LEFT CONTENT */}
      <div>
        <p className="text-sm text-gray-400">{title}</p>

        <h2 className="text-2xl font-semibold mt-1">{value}</h2>

        {trend && (
          <p
            className={`text-xs mt-1 ${
              trend === "up" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? "▲ Increasing" : "▼ Decreasing"}
          </p>
        )}
      </div>

      {/* RIGHT MINI GRAPH */}
      <div className="w-32 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, bottom: 5 }}>
            <XAxis dataKey="i" hide />
            <YAxis hide domain={["auto", "auto"]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                trend === "up"
                  ? "#10b981"
                  : trend === "down"
                    ? "#ef4444"
                    : "#3b82f6" // neutral
              }
              strokeWidth={2}
              dot={false}
              strokeOpacity={1}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KPICard;
