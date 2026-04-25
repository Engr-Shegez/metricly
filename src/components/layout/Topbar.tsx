"use client";

import { Menu, PanelTop, Search, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import { currentDashboardUser } from "@/lib/project-dashboard-data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const segmentLabels: Record<string, string> = {
  dashboard: "Overview",
  team: "Team",
  reports: "Reports",
  settings: "Settings",
  statistics: "Insights",
  transaction: "Operations",
};

function openPalette() {
  window.dispatchEvent(new Event("metricly:open-command-palette"));
}

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = segments.map((segment, index) => ({
    label: segmentLabels[segment] ?? segment,
    key: `${segment}-${index}`,
  }));

  return (
    <header
      aria-label="Dashboard top bar"
      className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 lg:left-[18rem] lg:px-6"
    >
      <div className="glass-strong mx-auto flex max-w-[1600px] items-center justify-between rounded-[30px] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] text-foreground lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
              <PanelTop className="h-3.5 w-3.5" />
              {breadcrumbItems.length > 0
                ? breadcrumbItems.map((item, index) => (
                    <span className="flex items-center gap-2" key={item.key}>
                      {index > 0 ? <span>/</span> : null}
                      {item.label}
                    </span>
                  ))
                : "Workspace / Overview"}
            </div>
            <h1 className="mt-1 text-lg font-semibold text-foreground">
              Project Management Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/80 dark:bg-white/6 dark:hover:bg-white/10 md:inline-flex"
            onClick={openPalette}
            type="button"
          >
            <Search className="h-4 w-4" />
            Search
            <span className="rounded-full bg-secondary px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-secondary-foreground">
              Cmd K
            </span>
          </button>

          <div className="hidden rounded-full border border-[var(--glass-border)] bg-white/60 px-3 py-2 text-xs font-medium text-muted-foreground dark:bg-white/6 lg:flex lg:items-center lg:gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Sprint 14 in motion
          </div>

          <ThemeToggle />

          <div className="flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-white/60 px-2 py-2 shadow-sm dark:bg-white/6">
            <Avatar className="h-10 w-10">
              <AvatarFallback
                className={`${currentDashboardUser.avatarColor} text-sm font-semibold text-white`}
              >
                {currentDashboardUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden pr-2 text-left sm:block">
              <p className="text-sm font-semibold text-foreground">
                {currentDashboardUser.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentDashboardUser.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
