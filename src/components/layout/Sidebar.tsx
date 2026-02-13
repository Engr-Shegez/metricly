"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-65 border-r-2  p-8">
      <h2 className="text-2xl font-semibold mb-6">Metricly</h2>

      <nav className="flex flex-col gap-4 text-md">
        <Link
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "font-semibold text-(--color-accent)"
              : "text-(--color-secondary)"
          }
        >
          Dashboard
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
