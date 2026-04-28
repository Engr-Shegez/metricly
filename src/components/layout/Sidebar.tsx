"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    matches: (pathname: string) => pathname === "/dashboard",
  },
  {
    href: "/dashboard#agile-view",
    label: "Agile View",
    icon: FolderKanban,
    matches: (pathname: string) => pathname === "/dashboard",
  },
  {
    href: "/dashboard/team",
    label: "Team",
    icon: Users,
    matches: (pathname: string) => pathname.startsWith("/dashboard/team"),
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: Sparkles,
    matches: (pathname: string) => pathname.startsWith("/dashboard/reports"),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    matches: (pathname: string) => pathname.startsWith("/dashboard/settings"),
  },
];

const Sidebar = ({ open, setOpen }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {open ? (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        aria-label="Dashboard navigation"
        className={cn(
          "glass-strong fixed inset-y-4 left-4 z-50 flex w-[18rem] flex-col rounded-[32px] p-5 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-[120%]",
          "lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-3" href="/">
            <div className="rounded-2xl bg-white/70  p-2 shadow-sm dark:bg-white/10">
              <Image
                alt="Metricly logo"
                className="h-7 w-auto"
                height={32}
                priority
                src="/images/metricly-logo.png"
                width={120}
              />
            </div>
          </Link>

          <button
            aria-label="Close sidebar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--glass-border)text-foreground lg:hidden"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/40 bg-white/60 p-4 shadow-sm dark:border-white/8 dark:bg-white/5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Workspace
          </p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">
            Delivery OS
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            World-class project operations with a dense agile workflow and
            calmer stakeholder visibility.
          </p>
        </div>

        <nav className="mt-8 space-y-2" aria-label="Primary dashboard links">
          {navigation.map((item) => {
            const isActive = item.href.includes("#")
              ? false
              : item.matches(pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                className={cn(
                  "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-[rgba(109,77,42,0.14)] text-foreground shadow-sm dark:bg-white/10"
                    : "text-muted-foreground hover:bg-white/50 hover:text-foreground dark:hover:bg-white/6",
                )}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl border transition",
                      isActive
                        ? "border-white/50 bg-white/70 dark:border-white/10 dark:bg-white/8"
                        : "border-transparent bg-transparent group-hover:border-white/45 group-hover:bg-white/60 dark:group-hover:border-white/8 dark:group-hover:bg-white/6",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
                {isActive ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-[28px] border border-[var(--glass-border)] bg-[rgba(255,255,255,0.42)] p-4 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Sprint Pulse
            </p>
            <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              Healthy
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            12 tasks closed this week. Cycle time is down 18% and client
            sentiment is trending upward.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
