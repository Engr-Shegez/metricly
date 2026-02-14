import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  { id: "1", amount: 5000, type: "revenue", date: "2025-01-10" },
  { id: "2", amount: 1200, type: "expense", date: "2025-01-12" },

  { id: "2", amount: 7000, type: "revenue", date: "2025-02-05" },
  { id: "3", amount: 2000, type: "expense", date: "2025-02-08" },

  { id: "4", amount: 9000, type: "revenue", date: "2025-03-02" },
  { id: "5", amount: 3500, type: "expense", date: "2025-03-11" },

  { id: "6", amount: 6000, type: "revenue", date: "2025-04-07" },
  { id: "7", amount: 3500, type: "expense", date: "2025-04-17" },

  { id: "8", amount: 10000, type: "revenue", date: "2025-05-19" },
  { id: "9", amount: 4000, type: "expense", date: "2025-05-27" },
];
