import { Card } from "@/components/ui/card";

export default function TransactionsPage() {
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

        <div className="grid grid-cols-4  gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search transactions..."
            className="h-10 rounded-md border px-3 text-sm"
          />
          {/* status filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Type filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm">
            <option value="">All Types</option>
            <option value="payment">Payments</option>
            <option value="refund">Refund</option>
            <option value="withdrawal">Withdrawal</option>
          </select>

          {/* Date filter */}
          <select className="h-10 w-auto rounded-lg border px-3 text-sm">
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
              <tr className="border-b">
                <td className="py-3">TXN-102231</td>
                <td>John Doe</td>
                <td>$120.00</td>
                <td className="text-green-600 font-medium">Completed</td>
                <td>March 4, 2026</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">TXN-102232</td>
                <td>Jane Smith</td>
                <td>$85.00</td>
                <td className="text-yellow-600 font-medium">Pending</td>
                <td>March 5, 2026</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">TXN-102233</td>
                <td>David Lee</td>
                <td>$250.00</td>
                <td className="text-red-600 font-medium">Failed</td>
                <td>March 4, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
