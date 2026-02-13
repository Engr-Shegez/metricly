export type Transaction = {
  id: string;
  amount: number;
  type: "revenue" | "expense";
  date: string;
};
