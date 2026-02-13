import React from "react";
import KPICard from "@/components/ui/KPICard";
import { transactions } from "@/lib/mockData";
import {
  calculateTotalRevenue,
  calculateTotalExpenses,
  calculateNetProfit,
  calculateProfitMargin,
} from "@/lib/analytics";

const DashboardPage = () => {
  const totalRevenue = calculateTotalRevenue(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const netProfit = calculateNetProfit(totalRevenue, totalExpenses);
  const profitMargin = calculateProfitMargin(totalRevenue, netProfit);

  return (
    <div className="space-y-8 m-10">
      {/* page Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-(--color-secondary) mt-1">
          Overview of your business performance
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols_4 gap-y-13 gap-x-2">
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
        <KPICard title="Profit Margin" value={`${profitMargin}%`} />
      </div>
    </div>
  );
};

export default DashboardPage;
