"use client";

import Sidebar from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/*Left Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <main className="flex-1 flex flex-col p-5">
        <header className="mb-6 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button onClick={() => setOpen(true)} className="lg:hidden">
              <Menu size={26} />
            </button>

            {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}
          </div>

          <ThemeToggle />
        </header>

        <div className="rounded-2xl  border-gray-200 shadow-2xl bg-card p-4 shadow-soft-card">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

{
  /* right widget */
}
{
  /* <aside className="hidden w-80 space-y-6 bg-card p-6 shadow-soft-card lg:block">
        <div className="rounded-2xl border bg-linear-to-br from-primary to-primary/70 p-6 text-foreground">
          <h3 className="mb-3 text-xl font-semibold">Upgrade to Pro</h3>
          <p className="mb-5 text-2xl font-bold">$4.20 / Month</p>
          <button className="rounded-lg bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-card">
            Upgrade Now
          </button>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="mb-3 text-xl font-semibold text-foreground">
            Daily Meetings
          </h3>
          <p className="mb-5 text-2xl font-bold text-foreground">
            9:30 AM Standup
          </p>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            Join Meeting
          </button>
        </div>
      </aside> */
}
