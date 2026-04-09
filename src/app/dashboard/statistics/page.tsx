"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";
import { transactions, monthlyData, salesOrders } from "@/lib/mockData";

const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState("all");

  // Filter transactions based on time range
  const filteredTransactions = transactions.filter((t) => {
    if (timeRange === "all") return true;
    const transactionDate = new Date(t.date);
    const now = new Date();
    const diffInDays =
      (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24);

    if (timeRange === "30d") return diffInDays <= 30;
    if (timeRange === "90d") return diffInDays <= 90;
    return true;
  });

  // Calculate key metrics
  const totalRevenue = filteredTransactions
    .filter((t) => t.type === "revenue")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const profitMargin =
    totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0";

  const avgOrderValue =
    salesOrders.length > 0
      ? (
          salesOrders.reduce((sum, o) => sum + o.amount, 0) / salesOrders.length
        ).toFixed(2)
      : "0";

  const totalOrders = salesOrders.length;
  const completedOrders = salesOrders.filter(
    (o) => o.status === "completed",
  ).length;
  const conversionRate = ((completedOrders / totalOrders) * 100).toFixed(1);

  // Revenue by source (pie chart data)
  const revenueBySource = [
    { name: "Subscriptions", value: totalRevenue * 0.6, color: "#3b82f6" },
    { name: "One-time Sales", value: totalRevenue * 0.25, color: "#8b5cf6" },
    { name: "Upgrades", value: totalRevenue * 0.15, color: "#ec4899" },
  ];

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      change: "-2.3%",
      isPositive: false,
      icon: BarChart3,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      label: "Net Profit",
      value: `$${netProfit.toLocaleString()}`,
      change: `${profitMargin}% margin`,
      isPositive: netProfit >= 0,
      icon: PieChartIcon,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      change: `${completedOrders}/${totalOrders} orders`,
      isPositive: true,
      icon: TrendingUp,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8 p-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed insights into revenue, performance,
            <br /> and growth metrics.
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="md:flex items-center gap-2 hidden">
          {["all", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range === "all"
                ? "All Time"
                : range === "30d"
                  ? "Last 30 Days"
                  : "Last 90 Days"}
            </Button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-70 md:w-full  gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Revenue and Expenses Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-70 md:w-full ">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly revenue progression over 5 months
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Expenses Trend</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly expenses progression over 5 months
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue Distribution */}
      <Card className="p-6 w-70 md:w-full ">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Revenue by Source</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Distribution of revenue across different sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {revenueBySource.map((source, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{source.name}</p>
                  <p className="text-xs text-muted-foreground">
                    $
                    {source.value.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((source.value / totalRevenue) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6 w-70 md:w-full ">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Performance Metrics</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Key performance indicators across all time periods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Average Order Value",
              value: `$${avgOrderValue}`,
              subtext: "per order",
            },
            {
              label: "Total Orders",
              value: totalOrders.toString(),
              subtext: "all time",
            },
            {
              label: "Order Completion Rate",
              value: `${((completedOrders / totalOrders) * 100).toFixed(1)}%`,
              subtext: "successful orders",
            },
          ].map((metric, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-xs text-muted-foreground font-medium">
                {metric.label}
              </p>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Overview Table */}
      <Card className="p-6 w-70 md:w-full ">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Monthly Overview</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Detailed breakdown of monthly performance metrics
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Month
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Expenses
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Net Profit
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Profit Margin
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Orders
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((month, index) => {
                const netProfit = month.revenue - month.expenses;
                const profitMargin =
                  month.revenue > 0
                    ? ((netProfit / month.revenue) * 100).toFixed(1)
                    : "0";
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">
                      ${month.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-red-600">
                      ${month.expenses.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ${netProfit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      {profitMargin}%
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      {month.orders}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPage;
