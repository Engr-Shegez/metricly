import React from "react";
import KPICard from "@/components/ui/KPICard";
import { transactions } from "@/lib/mockData";

const DashboardPage = () => {
  const totalRevenue = transactions
    .filter((t) => t.type === "revenue")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  const ProfitMargin =
    totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : "0";

  return (
    <div className="space-y-8">
      {/* page Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-(--color-secondary) mt-1">
          Overview of your business performance
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols_4 gap-6">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="up"
        />
        <KPICard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          trend="down"
        />
        <KPICard title="Net Profit" value={`$${netProfit.toLocaleString()}`} />
        <KPICard title="Profit Margin" value={`${ProfitMargin}%`} />
      </div>
    </div>
  );
};

export default DashboardPage;
