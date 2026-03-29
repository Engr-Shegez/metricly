import React from "react";

const UsageCard = () => {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Usage</p>

      <div className="space-y-2">
        <p className="text-sm">API Requests</p>
        <div className="w-full h-2 bg-muted rounded-full">
          <div className="h-2 w-[60%] bg-emerald-500 rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground">6,000 / 10,000 requests</p>
      </div>
    </div>
  );
};

export default UsageCard;
