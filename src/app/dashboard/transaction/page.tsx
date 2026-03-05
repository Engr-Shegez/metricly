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
          <div className="h-10 rounded-md bg-muted"></div>
          <div className="h-10 rounded-md bg-muted"></div>
          <div className="h-10 rounded-md bg-muted"></div>
          <div className="h-10 rounded-md bg-muted"></div>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Transaction History</h2>

        <div className="h-100 rounded-md bg-muted"></div>
      </Card>
    </div>
  );
}
