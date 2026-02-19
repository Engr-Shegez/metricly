import React from "react";
import { Transaction } from "@/types/transaction";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { MoreVertical } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  type SortField = "date" | "amount";
  type SortDirection = "asc" | "desc";

  const [sortField, setSortField] = useState<SortField>("date");

  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery),
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
    if (sortField === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [transactions, searchQuery]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transaction</h2>

      <div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th
                className="py-3 cursor-pointer select-none"
                onClick={() => {
                  setSortField("date");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    ))}{" "}
                </div>
              </th>
              <th className="py-3">Customer</th>
              <th
                className="py-3 cursor-pointer select-none"
                onClick={() => {
                  setSortField("amount");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                <div className="flex items-center gap-2">
                  Amount
                  {sortField === "amount" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    ))}{" "}
                </div>
              </th>
              <th className="py-3">Status</th>
            </tr>
            <th className="py-3 text-right">Action</th>
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
              paginatedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">{formatDate(tx.date)}</td>
                  <td className="py-3">{tx.customer}</td>
                  <td className="py-3 font-medium">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className=" text-right relative">
                    <button
                      onClick={() =>
                        setOpenRowId(openRowId === tx.id ? null : tx.id)
                      }
                      className="p-2 rounded-md hover:bg-muted"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openRowId === tx.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-10">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* pagination control Ui */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
