"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const transactions = [
  {
    id: "TXN-10231",
    customer: "John Doe",
    amount: 120,
    status: "completed",
    date: "Mar 4, 2026",
  },

  {
    id: "TXN-10232",
    customer: "Jane Smith",
    amount: 85,
    status: "pending",
    date: "Mar 5, 2026",
  },

  {
    id: "TXN-10233",
    customer: "David Lee",
    amount: 250,
    status: "failed",
    date: "Mar 6, 2026",
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filterTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customer.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? txn.status === status : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 border-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all financial activity
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="p-6 border-none">
        <h2 className="font-semibold mb-4">Filters</h2>

        <div className="grid grid-cols-4   gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search transactions..."
            className="h-10 rounded-md border px-3 text-sm font-semibold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* status filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm font-semibold text-black bg-gray-500">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Type filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm font-semibold text-black bg-gray-500">
            <option value="">All Types</option>
            <option value="payment">Payments</option>
            <option value="refund">Refund</option>
            <option value="withdrawal">Withdrawal</option>
          </select>

          {/* Date filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm font-semibold text-black bg-gray-500">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days </option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Transaction History</h2>

        <div className="overflow-w-auto">
          <table className="w-full text-md">
            <thead className="text-left border-b">
              <tr className="text-muted-foreground">
                <th className="py-3">Transaction</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {filterTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                filterTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b">
                    <td className="py-3">{txn.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${txn.customer}`}
                          />
                          <AvatarFallback>
                            {txn.customer.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{txn.customer}</span>
                      </div>
                    </td>
                    <td>${txn.amount}</td>
                    <td>
                      <Badge
                        variant={
                          txn.status === "completed"
                            ? "default"
                            : txn.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td>{txn.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
