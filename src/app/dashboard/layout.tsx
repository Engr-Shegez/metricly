import Sidebar from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-5">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <ThemeToggle />
        </header>
        <div className="rounded-2xl border bg-card p-4 shadow-soft-card">
          {children}
        </div>
      </main>

      <aside className="hidden w-80 space-y-6 bg-card p-6 shadow-soft-card lg:block">
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
      </aside>
    </div>
  );
};

export default DashboardLayout;
