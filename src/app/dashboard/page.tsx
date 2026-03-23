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
  console.log("Filtered Transactions:", filteredTransactions);

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
  console.log("Monthly Data:", monthlyData);

  const ensureTrend = (data: number[]) => (data.length > 1 ? data : [0, 1]); // small variation

  const revenueTrend = ensureTrend(monthlyData.map((m) => m.revenue));
  const expenseTrend = ensureTrend(monthlyData.map((m) => m.expenses));
  const profitTrend = ensureTrend(monthlyData.map((m) => m.netProfit));

  return (
    <div className=" max-w-8xl mx-auto px-6 m-5 ">
      <div className="flex gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-10">
          {/* page Header */}
          <div className="h-20 flex  items-center justify-between">
            <div className=" ">
              <h1 className="text-4xl  font-bold">Dashboard</h1>
              <p className="text-lg text-gray-500 mt-1 ">
                Overview of your business performance
              </p>
              <p className="text-sm text-muted-foreground ">
                {new Date().toDateString()}
              </p>
            </div>

            {/*  */}
            <div>
              <div className=" hidden lg:block items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div>
                  <p className="lg:text-xl font-medium">Engr Shegez</p>
                  <p className="lg:text-md text-muted-foreground">
                    Sales Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Filters */}
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
                    : "border hover:bg-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-9 gap-x-9">
            <KPICard
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              trend="up"
              trendData={revenueTrend}
            />

            <KPICard
              title="Total Expenses"
              value={totalExpenses}
              prefix="$"
              trend="down"
              trendData={expenseTrend}
            />

            <KPICard
              title="Net Profit"
              value={netProfit}
              prefix="$"
              trendData={profitTrend}
            />

            <KPICard
              title="Profit Margin"
              value={Number(profitMargin)}
              suffix="%"
            />
          </div>

          {/* chart Section */}
          <div className="rounded-lg border p-6 ">
            <h2 className="text-2xl font-semibold mb-4">Revenue vs Expenses</h2>

            <div className="h-75  ">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString()}`,
                    ]}
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
          {/* Table */}
          <TransactionTable transactions={filteredTransactions} />
        </div>

        {/* right widget */}
        <aside className="hidden w-80 space-y-6 bg-card p-6 shadow-soft-card lg:block">
          {/* Upgrade card */}
          <div className="rounded-2xl border bg-linear-to-br from-primary to-primary/70 p-6 text-foreground">
            <h3 className="mb-3 text-xl font-semibold">Upgrade to Pro</h3>
            <p className="mb-5 text-2xl font-bold">$4.20 / Month</p>
            <button className="rounded-lg bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-card">
              Upgrade Now
            </button>
          </div>
          {/* Meeting card */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Daily Meetings
            </h3>
            <p className="mb-5 text-2xl font-bold text-foreground">
              9:30 AM Standup
            </p>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
              Join Meeting
            </button>
          </div>
          {/* Alert Card */}
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;
