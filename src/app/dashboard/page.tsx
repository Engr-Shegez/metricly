"use client";
import KPICard from "@/components/ui/KPICard";
import { transactions } from "@/lib/mockData";
import { useState } from "react";
import TransactionTable from "@/components/tables/TransactionTable";
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
  CartesianGrid,
  Legend,

  // Cell,
} from "recharts";

type DateFilter = "all" | "30d" | "90d";

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const filteredTransactions = transactions.filter((t) => {
    if (dateFilter === "all") return true;
    const transactionDate = new Date(t.date);
    const now = new Date();

    const diffInDays =
      (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dateFilter === "30d") return diffInDays <= 30;
    if (dateFilter === "90d") return diffInDays <= 90;

    return true;
  });

  const totalRevenue = calculateTotalRevenue(filteredTransactions);
  const totalExpenses = calculateTotalExpenses(filteredTransactions);
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

  const monthlyData = calculateMonthlyBreakdown(filteredTransactions);

  return (
    <div className="space-y-10 m-10 ">
      {/* page Header */}
      <div className="h-20 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-lg text-(--color-secondary) mt-1">
            Overview of your business performance
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date().toDateString()}
          </p>
        </div>

        {/*  */}
        <div>
          <div className=" hidden lg:block items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div>
              <p className="lg:text-xl font-medium">Engr Shegez</p>
              <p className="lg:text-md text-muted-foreground">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        {[
          { label: "All", value: "all" },
          { label: "Last 30 Days", value: "30d" },
          { label: "Last 90 Days", value: "90d" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setDateFilter(filter.value as DateFilter)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              dateFilter === filter.value
                ? "bg-emerald-800 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols_4 gap-y-9 gap-x-9 ">
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
      <div className="rounded-lg border p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Revenue vs Expenses</h2>

        <div className="h-75  ">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData}>
              <CartesianGrid stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`]}
              />
              <Legend />
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
                dot={{ r: 3 }}
                animationDuration={800}
                animationEasing="ease-out"
                // name="Net Profit"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
};

export default DashboardPage;
