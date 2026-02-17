import React from "react";
import { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transaction</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Date</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No transaction found for this period
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">{tx.date}</td>
                  <td className="py-3">{tx.customer}</td>
                  <td className="py-3 font-medium">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3">{tx.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;

{
  /* <tbody>
            {transactions.map((tx) => (



              <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3">{tx.date}</td>
                <td className="py-3">{tx.customer}</td>
                <td className="py-3 font-medium">
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="py-3">{tx.status}</td>
              </tr>
            ))}
          </tbody> */
}
