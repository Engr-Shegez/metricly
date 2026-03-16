import React from "react";
import MetricCard from "./MetricCard";
import Integration from "./Integration";

const DashboardPreviewUi = () => {
  return (
    <div className="w-225 bg-[#0f0f10] border border-white/10 rounded-xl p-6 shadow-2xl">
      {/* top nav */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-white">REDSUN</p>

        <div className="flex gap-6 text-sm text-gray-400">
          <span>Analytics</span>
          <span>Products</span>
          <span>Customers</span>
          <span>Campaigns</span>
        </div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MetricCard title="Total Views" value="72,350" />
        <MetricCard title="Sessions" value="29.4k" />
        <MetricCard title="Click Rate" value="56.8%" />
      </div>

      {/* body */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#151516] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-3">Import data</p>

          <div className="space-y-3">
            <Integration name="Hume" />
            <Integration name="Penta" />
            <Integration name="Border" />
          </div>
        </div>

        <div className="bg-[#151516] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-4">Monthly expenses</p>

          <div className="flex items-end gap-4 h-30">
            <div className="w-6 bg-orange-500 h-[70%] rounded" />
            <div className="w-6 bg-orange-500 h-[45%] rounded" />
            <div className="w-6 bg-orange-500 h-[85%] rounded" />
            <div className="w-6 bg-orange-500 h-[35%] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPreviewUi;
