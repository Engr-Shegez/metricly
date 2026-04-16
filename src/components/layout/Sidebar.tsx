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
  X,
} from "lucide-react";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const Sidebar = ({ open, setOpen }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64  p-8 transform transition-transform duration-300
        ${open ? "translate-x-0 bg-white" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/metricly-logo.png"
              alt="Metricly Logo"
              width={200}
              height={100}
              priority
            />
          </Link>

          {/* Close button mobile */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-black"
          >
            <X size={24} />
          </button>
        </div>

        <div className="gap-10 m-5  pt-12 text-xl ">
          <nav className="flex mb-12 font-bold flex-col gap-4 text-xl">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard"
                  ? "font-semibold text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <LayoutDashboard size={25} />
              Dashboard
            </Link>
          </nav>
          <nav className="flex mb-12 font-bold flex-col gap-4 text-xl">
            <Link
              href="/dashboard/statistics"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/statistics"
                  ? "font-semibold  text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <BarChart3 size={25} />
              Statistics
            </Link>
          </nav>
          <nav className="flex mb-12 font-bold flex-col gap-4 text-xl">
            <Link
              href="/dashboard/transaction"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/transaction"
                  ? "font-semibold  text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <ArrowLeftRight size={25} />
              Transaction
            </Link>
          </nav>
          <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
            <Link
              href="/dashboard/team"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/team"
                  ? "font-semibold  text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <Users size={25} />
              My Team
            </Link>
          </nav>
          <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
            <Link
              href="/dashboard/reports"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/reports"
                  ? "font-semibold  text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <FileText size={25} />
              Sell Reports
            </Link>
          </nav>
          <nav className="flex mb-12 font-bold  flex-col gap-4 text-xl">
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/settings"
                  ? "font-semibold text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <Settings size={25} />
              Settings
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
