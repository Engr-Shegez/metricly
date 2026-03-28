import React from "react";

const PlanCard = () => {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <h2 className="text-lg font-semibold">Pro Plan</h2>
          <p className="text-sm text-muted-foreground">$29/month</p>
        </div>

        <button className="text-sm underline">Change Plan</button>
      </div>
    </div>
  );
};

export default PlanCard;
