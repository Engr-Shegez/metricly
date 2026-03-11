"use client";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesPage = () => {
  const salesData = [
    { date: "Mon", revenue: 240, orders: 4 },
    { date: "Tues", revenue: 560, orders: 6 },
    { date: "Wed", revenue: 940, orders: 8 },
    { date: "Thurs", revenue: 440, orders: 3 },
    { date: "Fri", revenue: 210, orders: 8 },
    { date: "Sat", revenue: 590, orders: 2 },
    { date: "Sun", revenue: 450, orders: 5 },
  ];

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);

  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);

  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sales Reports</h1>
        <p className="text-muted-foreground text-sm">
          Track revenue, orders and sales performance
        </p>
      </div>
      {/* KPI CARD */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">${totalRevenue}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold mt-2">${totalOrders}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Average Order value</p>
          <p className="text-2xl font-bold mt-2">${avgOrderValue}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Growth</p>
          <p className="text-2xl font-bold mt-2">+12%</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Revenue Trend</h2>

          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SalesPage;
