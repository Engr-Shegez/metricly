"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const filterTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customer.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? txn.status === status : true;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;

  const currentTransactions = filterTransactions.slice(
    indexOfFirst,
    indexOfLast,
  );

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const successfulPayments = transactions.filter(
    (t) => t.status === "completed",
  ).length;

  const pendingPayments = transactions.filter(
    (t) => t.status === "pending",
  ).length;

  const failedPayments = transactions.filter(
    (t) => t.status === "failed",
  ).length;

  const exportCSV = () => {
    const headers = ["Transaction ID", "Customer", "Amount", "Status", "Date"];

    const rows = filterTransactions.map((txn) => [
      txn.id,
      txn.customer,
      txn.amount,
      txn.status,
      txn.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();
  };

  const revenueData = transactions.map((txn) => ({
    date: txn.date,
    revenue: txn.status === "completed" ? txn.amount : 0,
  }));

  return (
    <div className="flex flex-col gap-8 border-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all financial activity
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 text-sm border rounded-md hover:bg-muted"
        >
          Export CSV
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold mt-2 ">${totalRevenue}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Successful Payments</p>
          <p className="text-2xl font-bold mt-2 ">{successfulPayments}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="text-2xl font-bold mt-2 ">{pendingPayments}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Failed Payments</p>
          <p className="text-2xl font-bold mt-2 ">{failedPayments}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Revenue Trend</h2>
        <div className="h-90">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffa500"
                strokeWidth="2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

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
                currentTransactions.map((txn) => (
                  <Sheet key={txn.id}>
                    <SheetTrigger asChild>
                      <tr className="border-b cursor-pointer hover:bg-muted/40">
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
                    </SheetTrigger>
                    <SheetContent className="bg-gray-800 font-semibold text-white px-6 border-none ">
                      <SheetHeader>
                        <SheetTitle className="text-xl py-4 text-orange-500">
                          Transaction Details
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Transaction ID
                          </span>
                          <span>{txn.id}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Customer
                          </span>
                          <span>{txn.customer}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span>${txn.amount}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span>{txn.status}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span>{txn.date}</span>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border rounded-md text-md"
            >
              Previous
            </button>
            <span className="text-md text-muted-foreground">
              Page {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * transactionsPerPage < filterTransactions.length
                    ? prev + 1
                    : prev,
                )
              }
              className="px-4 py-2 border rounded-md text-md"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
