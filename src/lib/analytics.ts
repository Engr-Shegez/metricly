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
