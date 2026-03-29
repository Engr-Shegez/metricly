import BillingHistory from "./billing-history";
import PaymentMethodCard from "./payment-method-card";
import PlanCard from "./plan-card";
import UsageCard from "./usage-card";

const BillingPage = () => {
  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and payments{" "}
        </p>
      </div>

      {/* PLAN */}
      <PlanCard />

      {/* USAGE */}
      <UsageCard />

      {/* Payment Method */}
      <PaymentMethodCard />

      {/* Billing History */}
      <BillingHistory />
    </div>
  );
};

export default BillingPage;
