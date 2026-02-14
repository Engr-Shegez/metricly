import { Transaction } from "@/types/transaction";

export function calculateTotalRevenue(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === "revenue")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateNetProfit(revenue: number, expenses: number) {
  return revenue - expenses;
}

export function calculateProfitMargin(revenue: number, netProfit: number) {
  if (revenue === 0) return 0;
  return Number(((netProfit / revenue) * 100).toFixed(2));
}

// Monthly Aggregation Function
export function calculateMonthlyBreakdown(transactions: Transaction[]) {
  const monthlyData: Record<string, { revenue: number; expenses: number }> = {};

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = {
        revenue: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "revenue") {
      monthlyData[month].revenue += transaction.amount;
    } else {
      monthlyData[month].expenses += transaction.amount;
    }
  });

  return Object.entries(monthlyData).map(([month, values]) => ({
    month,
    revenue: values.revenue,
    expenses: values.expenses,
  }));
}
