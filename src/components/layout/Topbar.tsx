import React from "react";

const Topbar = () => {
  return (
    <div className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <p className="text-sm font-medium">Engr Shegez</p>
          <p className="text-xs text-muted-foreground">Sales Manager</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
