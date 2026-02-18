export type TransactionStatus = "paid" | "pending" | "failed";

export type Transaction = {
  id: string;
  amount: number;
  type: "revenue" | "expense";
  date: string;
  status: TransactionStatus;
  customer: string;
};
