"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  MoonStar,
  Search,
  SunMedium,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { dashboardProjects } from "@/lib/project-dashboard-data";
import { cn } from "@/lib/utils";

function emitDashboardEvent(name: string, detail?: string) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const projectResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return dashboardProjects;
    }

    return dashboardProjects.filter((project) =>
      `${project.name} ${project.client}`.toLowerCase().includes(query),
    );
  }, [search]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("metricly:open-command-palette", handleOpen);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("metricly:open-command-palette", handleOpen);
    };
  }, []);

  const closePalette = () => {
    setOpen(false);
    setSearch("");
  };

  const themeActionLabel =
    resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[70] bg-slate-950/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePalette}
        >
          <motion.div
            aria-label="Global command palette"
            className="mx-auto mt-20 w-[min(680px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-white/40 bg-[var(--glass-strong)] shadow-[0_30px_90px_rgba(34,25,14,0.18)] backdrop-blur-2xl dark:border-white/10 dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 280, damping: 26 },
            }}
            exit={{ y: 14, opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <Command
              className="overflow-hidden"
              label="Search projects and run dashboard commands"
            >
              <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-5 py-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  className="h-8 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  onValueChange={setSearch}
                  placeholder="Search projects, actions, and views..."
                  value={search}
                />
                <span className="rounded-full border border-[var(--glass-border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Cmd K
                </span>
              </div>

              <Command.List className="max-h-[420px] overflow-y-auto p-3">
                <Command.Empty className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No matching projects or actions.
                </Command.Empty>

                <Command.Group
                  className="space-y-1"
                  heading="Projects"
                >
                  <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Projects
                  </div>
                  {projectResults.map((project) => (
                    <Command.Item
                      key={project.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-sm text-foreground outline-none transition data-[selected=true]:bg-white/60 dark:data-[selected=true]:bg-white/8",
                      )}
                      keywords={[project.client]}
                      onSelect={() => {
                        router.push("/dashboard#project-overview");
                        window.setTimeout(
                          () => emitDashboardEvent("metricly:focus-project", project.id),
                          80,
                        );
                        closePalette();
                      }}
                      value={`${project.name} ${project.client}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-amber-700 shadow-sm dark:bg-white/8 dark:text-amber-200">
                          <FolderKanban className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {project.client}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  className="space-y-1"
                  heading="Actions"
                >
                  <div className="px-2 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Actions
                  </div>

                  <Command.Item
                    className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm outline-none transition data-[selected=true]:bg-white/60 dark:data-[selected=true]:bg-white/8"
                    onSelect={() => {
                      emitDashboardEvent("metricly:create-task");
                      closePalette();
                    }}
                    value="Create task"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/8">
                      <CheckSquare className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Create task</p>
                      <p className="text-xs text-muted-foreground">
                        Open the quick task composer
                      </p>
                    </div>
                  </Command.Item>

                  <Command.Item
                    className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm outline-none transition data-[selected=true]:bg-white/60 dark:data-[selected=true]:bg-white/8"
                    onSelect={() => {
                      setTheme(resolvedTheme === "dark" ? "light" : "dark");
                      closePalette();
                    }}
                    value={themeActionLabel}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/8">
                      {resolvedTheme === "dark" ? (
                        <SunMedium className="h-4 w-4" />
                      ) : (
                        <MoonStar className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">
                        {themeActionLabel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Toggle the dashboard theme instantly
                      </p>
                    </div>
                  </Command.Item>

                  <Command.Item
                    className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm outline-none transition data-[selected=true]:bg-white/60 dark:data-[selected=true]:bg-white/8"
                    onSelect={() => {
                      router.push("/dashboard#agile-view");
                      window.setTimeout(
                        () => emitDashboardEvent("metricly:jump-agile"),
                        80,
                      );
                      closePalette();
                    }}
                    value="Jump to agile view"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/8">
                      <FolderKanban className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">
                        Jump to Agile View
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Scroll directly to the Kanban board
                      </p>
                    </div>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
