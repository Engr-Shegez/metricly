import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}

      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-5 bg-gray-200">{children}</main>
    </div>
  );
};

export default DashboardLayout;
