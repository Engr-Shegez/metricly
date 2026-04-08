"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { transactions, salesOrders, monthlyData } from "@/lib/mockData";
import TransactionTable from "@/components/tables/TransactionTable";

type DateFilter = "all" | "30d" | "90d";

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  // Filter transactions by date
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

  // Calculate metrics
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
      ? Math.round(
          salesOrders.reduce((sum, o) => sum + o.amount, 0) /
            salesOrders.length,
        )
      : 0;

  const completedOrders = salesOrders.filter(
    (o) => o.status === "completed",
  ).length;
  const conversionRate = ((completedOrders / salesOrders.length) * 100).toFixed(
    1,
  );

  // Recent orders for the table
  const recentOrders = salesOrders.slice(0, 5);

  const kpis = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      change: "-2.3%",
      isPositive: false,
      icon: Activity,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      label: "Net Profit",
      value: `$${netProfit.toLocaleString()}`,
      change: `${profitMargin}%`,
      isPositive: netProfit >= 0,
      icon: TrendingUp,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Orders",
      value: completedOrders.toString(),
      change: `${conversionRate}% conversion`,
      isPositive: true,
      icon: ShoppingCart,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8 p-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your business overview.
          </p>
        </div>

        {/* Date Filter */}
        <div className="md:flex items-center gap-2 hidden">
          {(["all", "30d", "90d"] as const).map((filter) => (
            <Button
              key={filter}
              variant={dateFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter(filter)}
              className="capitalize"
            >
              {filter === "all"
                ? "All Time"
                : filter === "30d"
                  ? "Last 30 Days"
                  : "Last 90 Days"}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid w-70 md:w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        kpi.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.iconColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-70 md:w-full">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly revenue over the last 5 months
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
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders Breakdown */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Orders Status</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Distribution of order statuses
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Completed",
                count: completedOrders,
                color: "bg-green-50 text-green-700",
                barColor: "bg-green-500",
              },
              {
                label: "Pending",
                count: salesOrders.filter((o) => o.status === "pending").length,
                color: "bg-amber-50 text-amber-700",
                barColor: "bg-amber-500",
              },
              {
                label: "Failed",
                count: salesOrders.filter((o) => o.status === "failed").length,
                color: "bg-red-50 text-red-700",
                barColor: "bg-red-500",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span
                    className={`text-sm font-bold px-2 py-1 rounded ${item.color}`}
                  >
                    {item.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.barColor} h-2 rounded-full`}
                    style={{
                      width: `${(item.count / salesOrders.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Orders Chart */}
      <Card className="p-6 w-70 md:w-full">
        <div className="mb-6 ">
          <h3 className="text-sm font-semibold">Orders Over Time</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Number of orders processed monthly
          </p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
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
            <Bar dataKey="orders" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6 w-70 md:w-full">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Recent Orders</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Latest {recentOrders.length} orders from your customers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold ">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-400">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {order.customer}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {order.product}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-500">
                    ${order.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-300 text-green-800"
                          : order.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
