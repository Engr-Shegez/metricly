import React from "react";
import { Transaction } from "@/types/transaction";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { MoreVertical } from "lucide-react";
import ConfirmModal from "../ConfirmModal";
import { toast } from "sonner";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  type SortField = "date" | "amount";
  type SortDirection = "asc" | "desc";

  const [sortField, setSortField] = useState<SortField>("date");
  const [tableData, setTableData] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("transactions");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return transactions;
  });
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenRowId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(tableData));
  }, [tableData]);

  const filteredTransactions = tableData.filter(
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
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className=" rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transaction</h2>

      <div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
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
            {tableData.length === 0 ? (
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
                  className="border-b hover:bg-gray-700 transition"
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
                      <div
                        ref={dropdownRef}
                        className={`absolute right-0 mt-2 w-32 bg-gray-900 border rounded-md shadow-md z-10 transition-all duration-150 ease-out ${openRowId === tx.id ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                      >
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                          View
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget(tx.id);
                            setOpenRowId(null);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-600"
                        >
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
        {deleteTarget && (
          <ConfirmModal
            title="Confirm Deletion"
            message="Are you sure you want to delete this transaction?"
            onCancel={() => setDeleteTarget(null)}
            onConfirm={() => {
              const deletedItem = tableData.find(
                (tx) => tx.id === deleteTarget,
              );
              if (!deletedItem) return;

              setTableData((prev) =>
                prev.filter((tx) => tx.id !== deleteTarget),
              );
              toast.success("Transaction deleted successfully", {
                action: {
                  label: "undo",
                  onClick: () => {
                    setTableData((prev) => [deletedItem, ...prev]);
                  },
                },
              });
              setDeleteTarget(null);
            }}
          />
        )}
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
          Page {safeCurrentPage} of {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages, 1)))
          }
          disabled={safeCurrentPage === Math.max(totalPages, 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
