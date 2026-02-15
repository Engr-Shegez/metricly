"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  ArrowLeftRight,
  Users,
  FileText,
  Settings,
  Omega,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-65 border-r-2 p-8">
      <h2
        className={`flex text-3xl pl-5 font-bold mb-12 mt-8 items-center gap-3 ${
          pathname === "/dashboard"
            ? " text-(--color-accent)"
            : "text-(--color-secondary)"
        }`}
      >
        <Omega size={30} />
        Metricly
      </h2>

      <div className="gap-10 m-5  pt-12 text-xl ">
        <nav className="flex mb-12 font-bold flex-col gap-4 text-xl">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 ${
              pathname === "/dashboard"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </nav>
        <nav className="flex mb-12 font-bold flex-col gap-4 text-xl">
          <Link
            href="/statistics"
            className={`flex items-center gap-3 ${
              pathname === "/statistics"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <BarChart3 size={20} />
            Statistics
          </Link>
        </nav>
        <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
          <Link
            href="/transactions"
            className={`flex items-center gap-3 ${
              pathname === "/transaction"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <ArrowLeftRight size={20} />
            Transaction
          </Link>
        </nav>
        <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
          <Link
            href="/team"
            className={`flex items-center gap-3 ${
              pathname === "/team"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <Users size={20} />
            My Team
          </Link>
        </nav>
        <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
          <Link
            href="/reports"
            className={`flex items-center gap-3 ${
              pathname === "/reports"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <FileText size={20} />
            Sell Reports
          </Link>
        </nav>
        <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
          <Link
            href="/settings"
            className={`flex items-center gap-3 ${
              pathname === "/settings"
                ? "font-semibold text-(--color-accent)"
                : "text-(--color-secondary)"
            }`}
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
