import React from "react";

type KPICardProps = {
  title: string;
  value: string;
  trend?: "up" | "down";
};

const KPICardProps = ({ title, value, trend }: KPICardProps) => {
  return (
    <div className="rounded-lg border lg:w-172 p-6 bg-white">
      <p>{title}</p>

      <h2 className="text-2xl font-semibold mt-2">{value}</h2>

      {trend && (
        <p
          className={`text-sm mt-2 ${trend === "up" ? "text-(--color-success)" : "text-(--color-danger)"}`}
        >
          {trend === "up" ? "▲ Increasing" : "▼ Decreasing"}
        </p>
      )}
    </div>
  );
};

export default KPICardProps;
