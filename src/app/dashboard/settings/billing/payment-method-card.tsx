import React from "react";

const PaymentMethodCard = () => {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <p className="text-sm text-muted-foreground"> Payment Method</p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Visa .... 4242</p>
          <p className="text-xs text-muted-foreground">Expiry 12/26</p>
        </div>

        <button className="text-sm underline">Update</button>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
