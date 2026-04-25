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
export const calculateMonthlyBreakdown = (transactions: Transaction[]) => {
  const monthsOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyMap: Record<
    string,
    { month: string; revenue: number; expenses: number; netProfit: number }
  > = {};

  // Initialize ALL months
  monthsOrder.forEach((m) => {
    monthlyMap[m] = {
      month: m,
      revenue: 0,
      expenses: 0,
      netProfit: 0,
    };
  });

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (t.type === "revenue") {
      monthlyMap[month].revenue += t.amount;
    } else {
      monthlyMap[month].expenses += t.amount;
    }

    monthlyMap[month].netProfit =
      monthlyMap[month].revenue - monthlyMap[month].expenses;
  });

  return monthsOrder.map((m) => monthlyMap[m]);
};
