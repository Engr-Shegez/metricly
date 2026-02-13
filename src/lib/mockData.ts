import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  { id: "1", amount: 5000, type: "revenue", date: "2025-01-01" },

  { id: "2", amount: 1200, type: "expense", date: "2025-01-02" },
  { id: "3", amount: 3000, type: "revenue", date: "2025-01-05" },
  { id: "4", amount: 800, type: "expense", date: "2025-01-10" },
];
