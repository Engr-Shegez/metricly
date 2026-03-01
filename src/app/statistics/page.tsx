"use client";
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

const StatisticsPage = () => {
  const revenueData = [
    { day: "Mon", revenue: 2400 },
    { day: "Tue", revenue: 1398 },
    { day: "Wed", revenue: 3800 },
    { day: "Thu", revenue: 2908 },
    { day: "Fri", revenue: 4800 },
    { day: "Sat", revenue: 3970 },
    { day: "Sun", revenue: 5200 },
  ];
  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Statictics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Detailed insights into revenue, performance and growth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="px-3 py-2 text-sm border border-gray-500 text-white rounded-lg bg-gray-800">
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
            $24,580
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +12.5% from last period
          </p>
        </div>
        {/* AOV */}
        <div className="p-6 rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Avg Order Value</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            $128.40
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +4.2% improvement
          </p>
        </div>
        {/* Conversion */}
        <div className="p-6  rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Conversion Rate</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">3.84%</h2>
          <p className="mt-1 text-md text-green-600 font-medium">-0.6% drop</p>
        </div>
        {/* Growth */}
        <div className="p-6  rounded-xl border  shadow-md">
          <p className="text-md text-gray-500">Net Growth</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">+18.3%</h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            Strong Upward trend
          </p>
        </div>
      </div>
      {/* Revenue Trend */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
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
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
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
    </div>
  );
};

export default StatisticsPage;
