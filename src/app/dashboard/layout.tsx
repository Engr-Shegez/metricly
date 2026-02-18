import Sidebar from "@/components/layout/Sidebar";

import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* sidebar */}

      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1  p-5 bg-gray-200">{children}</main>

      <aside className="w-100 pt-50 sm:hidden md:hidden lg:block bg-gray-200 p-6 space-y-6">
        {/* upgrade card */}
        <div className="bg-linear-to-br from-blue-600 to-blue-400 text-white rounded-2xl p-6">
          <h3 className="text-xl mb-3 font-semibold ">Upgrade to Pro</h3>
          <p className="text-2xl font-bold mb-5">$4.20 / Month</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
            Upgrade Now
          </button>
        </div>
        {/* Meeting Widget */}
        <div className="bg-linear-to-br mt-15  bg-amber-50 text-white rounded-2xl p-6">
          <h3 className="text-xl text-black mb-3 font-semibold ">
            Daily Meetings
          </h3>
          <p className="text-2xl text-black font-bold mb-5">$4.20 / Month</p>
          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium">
            Click For meeting Link
          </button>
        </div>
        {/* Team Widget */}
      </aside>
    </div>
  );
};

export default DashboardLayout;
