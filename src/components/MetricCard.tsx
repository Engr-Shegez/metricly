import React from "react";

type MetricCardProps = {
  title: string;
  value: string;
};

const MetricCard = ({ title, value }: MetricCardProps) => {
  return (
    <div className="bg-[#151516] p-4 rounded-lg">
      <p className="text-xs text-gray-400">{title}</p>

      <p className="text-lg font-semibold text-white">{value}</p>

      <div className="mt-2 h-6 bg-orange-500/30 rounded" />
    </div>
  );
};
export default MetricCard;
