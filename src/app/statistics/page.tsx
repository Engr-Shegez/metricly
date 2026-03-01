import React from "react";

const StatisticsPage = () => {
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
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <p className="text-md text-gray-500">Total Revenue</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            $24,580
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +12.5% from last period
          </p>
        </div>
        {/* AOV */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <p className="text-md text-gray-500">Avg Order Value</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">
            $128.40
          </h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            +4.2% improvement
          </p>
        </div>
        {/* Conversion */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <p className="text-md text-gray-500">Conversion Rate</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">3.84%</h2>
          <p className="mt-1 text-md text-green-600 font-medium">-0.6% drop</p>
        </div>
        {/* Growth */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <p className="text-md text-gray-500">Net Growth</p>
          <h2 className="mt-2 text-2xl text-gray-500  font-semibold">+18.3%</h2>
          <p className="mt-1 text-md text-green-600 font-medium">
            Strong Upward trend
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
