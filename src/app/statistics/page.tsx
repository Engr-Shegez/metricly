"use client";
import { useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";

const StatisticsPage = () => {
  const [range, setRange] = useState("30");
  const generateRevenueData = (days: number) => {
    return Array.from({ length: days }).map((_, i) => ({
      day: `Day ${i + 1}`,
      revenue: Math.floor(Math.random() * 5000 + 1000),
    }));
  };

  const revenueData = generateRevenueData(Number(range));
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / revenueData.length;
  const previousRevenueData = generateRevenueData(Number(range));
  const previousTotal = previousRevenueData.reduce(
    (sum, items) => sum + items.revenue,
    0,
  );
  const growth = ((totalRevenue - previousTotal) / previousTotal) * 100;
  const conversionRate = (Math.random() * 2 + 2).toFixed(2);

  const distributionData = [
    { name: "Website", value: 12400 },
    { name: "Mobile App", value: 8900 },
    { name: "Direct Sales", value: 5400 },
    { name: "Affiliates", value: 3200 },
  ];
  const PIE_COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#ef4444"];

  const monthlyData = [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 21000 },
    { month: "Mar", revenue: 10600 },
    { month: "Apr", revenue: 14500 },
    { month: "May", revenue: 45000 },
  ];

  return (
    <div className="p-6 space-y-10 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Statictics</h1>
          <p className="text-md font-semibold text-gray-200 mt-1">
            Detailed insights into revenue, performance and growth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-500 text-white rounded-lg bg-gray-800"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>

          <button className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Export
          </button>
        </div>
      </div>
      {/* KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="p-6  rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Total Revenue</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            ${totalRevenue.toLocaleString()}
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +12.5% from last period
          </p>
        </div>
        {/* AOV */}
        <div className="p-6 rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Avg Order Value</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            ${avgRevenue.toFixed(2)}
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +4.2% improvement
          </p>
        </div>
        {/* Conversion */}
        <div className="p-6  rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Conversion Rate</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            {conversionRate}%
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">-0.6% drop</p>
        </div>
        {/* Growth */}
        <div className="p-6  rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Net Growth</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            {growth.toFixed(1)}%
          </h2>
          <p
            className={`mt-1 text-md  ${growth >= 0 ? "text-green-600" : "text-red-500"} font-medium`}
          >
            Strong Upward trend
          </p>
        </div>
      </div>
      {/* Revenue Trend */}
      <div className=" border border-gray-700 rounded-xl shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sembold"> Revenue Trend</h2>
            <p className="text-lg text-gray-800">
              Daily revenue performance over selected period
            </p>
          </div>
        </div>
        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10 }}
                interval={Math.floor(Number(range) / 10)}
                stroke="#9ca3af"
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PIE CHART CARD */}
        <div className=" border border-gray-700 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Revenue Distribution</h2>
            <p className="text-sm text-gray-500">
              Breakdown by acquisition channel
            </p>
          </div>
          {/* pie CHART GOES HERE  */}
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                >
                  {distributionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* bar chart card */}
        <div className=" border border-gray-700 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Monthly Comparison</h2>
            <p className="text-md text-gray-500">
              Revenue comparison over recent months
            </p>
          </div>
          {/* Bar goes here  */}
          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={15} />
                <YAxis stroke="#9ca3af" fontSize={15} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#35b83E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
