"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { salesOrders, monthlyData } from "@/lib/mockData";

const SalesPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter orders by status
  let filteredOrders = salesOrders;
  if (filterStatus !== "all") {
    filteredOrders = salesOrders.filter((o) => o.status === filterStatus);
  }

  // Calculate metrics
  const totalRevenue = salesOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = salesOrders.length;
  const completedOrders = salesOrders.filter(
    (o) => o.status === "completed",
  ).length;
  const pendingOrders = salesOrders.filter(
    (o) => o.status === "pending",
  ).length;
  const failedOrders = salesOrders.filter((o) => o.status === "failed").length;

  const avgOrderValue = Math.round(totalRevenue / totalOrders);
  const conversionRate = ((completedOrders / totalOrders) * 100).toFixed(1);

  // Weekly sales data
  const weeklySalesData = [
    { day: "Monday", revenue: 4200, orders: 12 },
    { day: "Tuesday", revenue: 5600, orders: 15 },
    { day: "Wednesday", revenue: 6400, orders: 18 },
    { day: "Thursday", revenue: 4900, orders: 14 },
    { day: "Friday", revenue: 7200, orders: 20 },
    { day: "Saturday", revenue: 3800, orders: 8 },
    { day: "Sunday", revenue: 5100, orders: 11 },
  ];

  const kpis = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      change: `${conversionRate}% conversion`,
      isPositive: true,
      icon: TrendingUp,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Average Order Value",
      value: `$${avgOrderValue}`,
      change: "+3.5% increase",
      isPositive: true,
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Completed Orders",
      value: completedOrders.toString(),
      change: `${((completedOrders / totalOrders) * 100).toFixed(0)}% rate`,
      isPositive: true,
      icon: AlertCircle,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Reports</h1>
          <p className="text-muted-foreground mt-1">
            Track revenue, orders, and sales performance across all channels.
          </p>
        </div>

        {/* Export Button */}
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Weekly Revenue</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue breakdown by day of the week
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
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

        {/* Orders Trend */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold">Orders Per Day</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Number of orders processed daily
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
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
              <Bar dataKey="orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Order Status Overview */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Order Status Breakdown</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Distribution of orders by status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Completed",
              count: completedOrders,
              color: "bg-green-50 text-green-700",
              bgColor: "bg-green-100",
            },
            {
              label: "Pending",
              count: pendingOrders,
              color: "bg-amber-50 text-amber-700",
              bgColor: "bg-amber-100",
            },
            {
              label: "Failed",
              count: failedOrders,
              color: "bg-red-50 text-red-700",
              bgColor: "bg-red-100",
            },
          ].map((status, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${status.color}`}>
              <p className="text-sm font-medium mb-2">{status.label}</p>
              <p className="text-2xl font-bold">{status.count}</p>
              <p className="text-xs mt-2">
                {((status.count / totalOrders) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Orders Table */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Recent Orders</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Latest orders from your customers
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            {["all", "completed", "pending", "failed"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === "all" ? "All Orders" : status}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.product}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                    ${order.amount}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No orders found for the selected status.
            </p>
          </div>
        )}
      </Card>

      {/* Monthly Revenue Summary */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold">Monthly Revenue Summary</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Revenue performance over the last 5 months
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
                  Orders
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((month, index) => (
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
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {month.orders}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                    ${(month.revenue / month.orders).toFixed(0)}
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

export default SalesPage;
