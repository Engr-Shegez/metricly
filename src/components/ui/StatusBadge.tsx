import React from "react";

interface StatusBadgeProps {
  status: "paid" | "pending" | "failed";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const baseStyle = "px-3 py-1 rounded-full text-xs font-medium capitalize";

  const statusStyles = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>{status}</span>
  );
};

export default StatusBadge;
