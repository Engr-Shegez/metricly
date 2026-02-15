"use client";
import KPICard from "@/components/ui/KPICard";
import { transactions } from "@/lib/mockData";
import {
  calculateTotalRevenue,
  calculateTotalExpenses,
  calculateNetProfit,
  calculateProfitMargin,
  calculateMonthlyBreakdown,
} from "@/lib/analytics";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DashboardPage = () => {
  const totalRevenue = calculateTotalRevenue(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const netProfit = calculateNetProfit(totalRevenue, totalExpenses);
  const profitMargin = calculateProfitMargin(totalRevenue, netProfit);

  const chartData = [
    {
      name: "Revenue",
      amount: totalRevenue,
    },
    {
      name: "Expenses",
      amount: totalExpenses,
    },
  ];

  const monthlyData = calculateMonthlyBreakdown(transactions);

  return (
    <div className="space-y-8 m-10">
      {/* page Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-(--color-secondary) mt-1">
          Overview of your business performance
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols_4 gap-y-13 gap-x-2">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="up"
        />
        <KPICard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          trend="down"
        />
        <KPICard title="Net Profit" value={`$${netProfit.toLocaleString()}`} />
        <KPICard title="Profit Margin" value={`${profitMargin}%`} />
      </div>

      {/* chart Section */}
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>

        <div className="h-75 ">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`]}
              />
              <Bar
                dataKey="revenue"
                fill="#10b981"
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="netProfit"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
