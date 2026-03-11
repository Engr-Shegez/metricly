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
  BarChart,
  Bar,
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

  type Sale = {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: string;
    date: string;
  };

  const sales: Sale[] = [
    {
      id: "ORD-1023",
      customer: "John Doe",
      product: "Pro Subscription",
      amount: 120,
      status: "completed",
      date: "Mar 10",
    },
    {
      id: "ORD-1024",
      customer: "Jane Smith",
      product: "Starter Plan",
      amount: 49,
      status: "pending",
      date: "Mar 10",
    },
    {
      id: "ORD-1025",
      customer: "Alex Lee",
      product: "Enterprise Plan",
      amount: 290,
      status: "completed",
      date: "Mar 9",
    },
    {
      id: "ORD-1026",
      customer: "Micheal Chen",
      product: "Pro Subscription",
      amount: 120,
      status: "failed",
      date: "Mar 8",
    },
  ];

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

      {/* chart */}
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
                  stroke="#00ff00"
                  strokeWidth={3}
                />
                <CartesianGrid strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Orders Per Day</h2>

          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* table card */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Recent Sales</h2>

        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="py-3">Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b">
                <td className="py-3 font-medium">{sale.id}</td>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td>{sale.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${sale.status === "completed" ? "bg-green-100 text-green-700" : sale.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}
                  >
                    {sale.status}
                  </span>
                </td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SalesPage;
