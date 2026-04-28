"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  CircleCheckBig,
  Layers3,
  MessageSquareHeart,
  Plus,
  Radar,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  activityFeed,
  clientSentimentSeries,
  currentDashboardUser,
  dashboardProjects,
  dashboardTasks,
  dashboardUsers,
  getNextActionTask,
} from "@/lib/project-dashboard-data";
import { cn } from "@/lib/utils";
import type {
  KanbanTask,
  ProjectHealth,
  TaskPriority,
  TaskStatus,
} from "@/types/project-dashboard";

const widgetTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
};

const healthStyles: Record<ProjectHealth, string> = {
  "on-track":
    "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  watch:
    "bg-amber-500/12 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  critical:
    "bg-rose-500/12 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

type DraftTaskState = {
  title: string;
  description: string;
  projectId: string;
  priority: TaskPriority;
  storyPoints: number;
};

function reorderTasks(
  tasks: KanbanTask[],
  taskId: string,
  targetStatus: TaskStatus,
  targetIndex: number,
) {
  const currentIndex = tasks.findIndex((task) => task.id === taskId);

  if (currentIndex === -1) {
    return tasks;
  }

  const task = tasks[currentIndex];
  const currentColumnIndex = tasks
    .filter((item) => item.status === task.status)
    .findIndex((item) => item.id === taskId);
  const remainingTasks = tasks.filter((item) => item.id !== taskId);
  const targetColumnTasks = remainingTasks.filter(
    (item) => item.status === targetStatus,
  );
  const adjustedIndex =
    task.status === targetStatus && currentColumnIndex < targetIndex
      ? targetIndex - 1
      : targetIndex;
  const safeIndex = Math.max(
    0,
    Math.min(adjustedIndex, targetColumnTasks.length),
  );
  const nextTask = { ...task, status: targetStatus };
  const targetTask = targetColumnTasks[safeIndex];

  if (!targetTask) {
    return [...remainingTasks, nextTask];
  }

  const insertionIndex = remainingTasks.findIndex(
    (item) => item.id === targetTask.id,
  );

  return [
    ...remainingTasks.slice(0, insertionIndex),
    nextTask,
    ...remainingTasks.slice(insertionIndex),
  ];
}

function getMood(score: number) {
  if (score >= 8) {
    return { emoji: "😊", label: "Confident" };
  }

  if (score >= 6.5) {
    return { emoji: "🙂", label: "Steady" };
  }

  return { emoji: "😐", label: "Cautious" };
}

function SentimentTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-strong)] px-3 py-2 text-xs shadow-lg backdrop-blur-xl">
      Feedback score {payload[0].value}
    </div>
  );
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<KanbanTask[]>(dashboardTasks);
  const [syncingTaskId, setSyncingTaskId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState(
    dashboardProjects[0].id,
  );
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [draftTask, setDraftTask] = useState<DraftTaskState>({
    title: "",
    description: "",
    projectId: dashboardProjects[0].id,
    priority: "medium",
    storyPoints: 3,
  });

  const agileViewRef = useRef<HTMLElement | null>(null);
  const projectOverviewRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openCreateTask = () => setCreateTaskOpen(true);
    const jumpToAgile = () =>
      agileViewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    const focusProject = (event: Event) => {
      const projectId = (event as CustomEvent<string>).detail;

      if (!projectId) {
        return;
      }

      setActiveProjectId(projectId);
      projectOverviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("metricly:create-task", openCreateTask);
    window.addEventListener("metricly:jump-agile", jumpToAgile);
    window.addEventListener("metricly:focus-project", focusProject);

    return () => {
      window.removeEventListener("metricly:create-task", openCreateTask);
      window.removeEventListener("metricly:jump-agile", jumpToAgile);
      window.removeEventListener("metricly:focus-project", focusProject);
    };
  }, []);

  const nextActionTask = useMemo(
    () => getNextActionTask(tasks, currentDashboardUser.id),
    [tasks],
  );

  const activeProject = dashboardProjects.find(
    (project) => project.id === activeProjectId,
  );
  const moodScore =
    clientSentimentSeries.reduce(
      (total, item) => total + item.feedbackScore,
      0,
    ) / clientSentimentSeries.length;
  const mood = getMood(moodScore);
  const openTaskCount = tasks.filter((task) => task.status !== "done").length;
  const doneTaskCount = tasks.filter((task) => task.status === "done").length;
  const userTaskCount = tasks.filter(
    (task) =>
      task.assigneeId === currentDashboardUser.id && task.status !== "done",
  ).length;

  const handleMoveTask = (
    taskId: string,
    targetStatus: TaskStatus,
    targetIndex: number,
  ) => {
    setTasks((current) =>
      reorderTasks(current, taskId, targetStatus, targetIndex),
    );
    setSyncingTaskId(taskId);

    window.setTimeout(() => {
      setSyncingTaskId((current) => (current === taskId ? null : current));
    }, 700);
  };

  const handleCreateTask = () => {
    if (!draftTask.title.trim()) {
      toast.error("A task title is required.");
      return;
    }

    const task: KanbanTask = {
      id: `t-${crypto.randomUUID()}`,
      title: draftTask.title.trim(),
      description:
        draftTask.description.trim() ||
        "New task created from the command palette.",
      status: "backlog",
      priority: draftTask.priority,
      projectId: draftTask.projectId,
      assigneeId: currentDashboardUser.id,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
        .toISOString()
        .slice(0, 10),
      storyPoints: draftTask.storyPoints,
      tags: ["New", "Planned"],
    };

    setTasks((current) => [task, ...current]);
    setCreateTaskOpen(false);
    setDraftTask({
      title: "",
      description: "",
      projectId: dashboardProjects[0].id,
      priority: "medium",
      storyPoints: 3,
    });
    toast.success("Task created and added to backlog.");

    window.setTimeout(() => {
      agileViewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  return (
    <>
      <div className="space-y-5">
        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr_0.85fr]">
          <motion.article
            className="bento-card p-6 xl:col-span-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={widgetTransition}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border-(--glass-border) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  <Layers3 className="h-3.5 w-3.5" />
                  Senior-level architecture
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  A calmer, faster delivery cockpit for your projects and
                  clients.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  The workspace is now shaped around dense agile execution,
                  real-time presence, and executive clarity without losing the
                  warmth of a polished product experience.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="rounded-full px-5"
                    onClick={() =>
                      agileViewRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    Open Agile View
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    className="rounded-full"
                    onClick={() => setCreateTaskOpen(true)}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                    Create task
                  </Button>
                </div>
              </div>

              <div className="grid w-full  gap-4 sm:grid-cols-3 lg:max-w-xl">
                {[
                  {
                    label: "Open work",
                    value: openTaskCount,
                    detail: "Across all sprint lanes",
                    icon: Layers3,
                  },
                  {
                    label: "Completed",
                    value: doneTaskCount,
                    detail: "Closed this cycle",
                    icon: CircleCheckBig,
                  },
                  {
                    label: "Your focus",
                    value: userTaskCount,
                    detail: "Assigned to Maya",
                    icon: BrainCircuit,
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[26px] border border-white/45 bg-white/70 p-2 shadow-sm dark:border-white/8 dark:bg-white/5"
                  >
                    <metric.icon className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-3xl font-semibold text-foreground">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {metric.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            className="bento-card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...widgetTransition, delay: 0.04 }}
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <BrainCircuit className="h-4 w-4" />
              Next Action
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {nextActionTask
                ? `Based on your deadlines, you should work on ${nextActionTask.title} next.`
                : "You’re clear for now."}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {nextActionTask
                ? `It has the nearest due date and the strongest urgency profile in your queue.`
                : "No active assigned tasks are competing for your attention."}
            </p>

            {nextActionTask ? (
              <div className="mt-5 rounded-[26px] border border-[var(--glass-border)] bg-white/65 p-4 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Due{" "}
                      {new Date(nextActionTask.dueDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {nextActionTask.storyPoints} story points
                    </p>
                  </div>
                  <span className="rounded-full bg-rose-500/12 px-3 py-1 text-xs font-semibold capitalize text-rose-700 dark:text-rose-300">
                    {nextActionTask.priority}
                  </span>
                </div>
              </div>
            ) : null}
          </motion.article>

          <motion.article
            className="bento-card p-6"
            id="project-overview"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            ref={projectOverviewRef}
            transition={{ ...widgetTransition, delay: 0.08 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  <Radar className="h-4 w-4" />
                  Client Mood
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {mood.emoji} {mood.label}
                </h3>
              </div>
              <div className="rounded-full border border-[var(--glass-border)] px-3 py-2 text-sm font-semibold text-foreground">
                {moodScore.toFixed(1)}/10
              </div>
            </div>

            <div className="mt-6 h-28">
              <ResponsiveContainer height="100%" width="100%">
                <LineChart data={clientSentimentSeries}>
                  <Tooltip content={<SentimentTooltip />} cursor={false} />
                  <Line
                    dataKey="feedbackScore"
                    dot={false}
                    stroke="var(--chart-2)"
                    strokeLinecap="round"
                    strokeWidth={3}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Client confidence is strengthening week over week, with the latest
              feedback highlighting clarity and faster turnaround.
            </p>
          </motion.article>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <motion.article
            className="bento-card p-6 xl:col-span-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...widgetTransition, delay: 0.12 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Portfolio
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  Active project signals
                </h3>
              </div>
              <Button className="rounded-full" variant="outline">
                Export snapshot
              </Button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {dashboardProjects.map((project) => (
                <button
                  key={project.id}
                  className={cn(
                    "rounded-[28px] border p-4 text-left transition",
                    activeProjectId === project.id
                      ? "border-primary/30 bg-white/80 shadow-[0_20px_45px_rgba(64,46,24,0.12)] dark:border-primary/25 dark:bg-white/8"
                      : "border-[var(--glass-border)] bg-white/55 hover:bg-white/75 dark:bg-white/5 dark:hover:bg-white/7",
                  )}
                  onClick={() => setActiveProjectId(project.id)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {project.client}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                        healthStyles[project.health],
                      )}
                    >
                      {project.health.replace("-", " ")}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.map((memberId) => {
                        const user = dashboardUsers.find(
                          (item) => item.id === memberId,
                        );

                        return (
                          <Avatar
                            className="h-8 w-8 border-2 border-[var(--glass-strong)]"
                            key={memberId}
                          >
                            <AvatarFallback
                              className={`${user?.avatarColor ?? "bg-slate-500"} text-[10px] font-semibold text-white`}
                            >
                              {user?.initials ?? "?"}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Due{" "}
                      {new Date(project.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {activeProject ? (
              <div className="mt-5 rounded-[28px] border border-[var(--glass-border)] bg-white/65 p-5 dark:bg-white/5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {activeProject.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Client: {activeProject.client}
                    </p>
                  </div>
                  <div className="rounded-full bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
                    Primary delivery track
                  </div>
                </div>
              </div>
            ) : null}
          </motion.article>

          <motion.article
            className="bento-card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...widgetTransition, delay: 0.16 }}
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              Team Rhythm
            </div>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Focus windows today
            </h3>

            <div className="mt-5 space-y-3">
              {dashboardUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-[24px] border border-[var(--glass-border)] bg-white/60 p-3 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        className={`${user.avatarColor} text-xs font-semibold text-white`}
                      >
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    Deep work: {user.focusHours}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="bento-card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...widgetTransition, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <MessageSquareHeart className="h-4 w-4" />
              Activity Feed
            </div>
            <h3 className="mt-3 text-xl font-semibold text-foreground">
              What changed recently
            </h3>

            <div className="mt-5 space-y-3">
              {activityFeed.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-[var(--glass-border)] bg-white/60 p-4 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>
        </section>

        <motion.section
          className="bento-card p-5"
          id="agile-view"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          ref={agileViewRef}
          transition={{ ...widgetTransition, delay: 0.24 }}
        >
          <KanbanBoard
            onMoveTask={handleMoveTask}
            syncingTaskId={syncingTaskId}
            tasks={tasks}
            users={dashboardUsers}
          />
        </motion.section>
      </div>

      <Dialog onOpenChange={setCreateTaskOpen} open={createTaskOpen}>
        <DialogContent className="border-0 bg-transparent p-0 shadow-none sm:max-w-[560px]">
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-strong rounded-[32px] p-6"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-foreground">
                Create a task
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-muted-foreground">
                Add work to the backlog instantly. The board will update
                optimistically and stay aligned with the rest of the dashboard.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="task-title"
                >
                  Task title
                </label>
                <Input
                  id="task-title"
                  onChange={(event) =>
                    setDraftTask((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Design the new retrospective summary"
                  value={draftTask.title}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="task-description"
                >
                  Description
                </label>
                <Textarea
                  id="task-description"
                  onChange={(event) =>
                    setDraftTask((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Capture the key deliverable or context."
                  rows={4}
                  value={draftTask.description}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="task-project"
                  >
                    Project
                  </label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none"
                    id="task-project"
                    onChange={(event) =>
                      setDraftTask((current) => ({
                        ...current,
                        projectId: event.target.value,
                      }))
                    }
                    value={draftTask.projectId}
                  >
                    {dashboardProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="task-priority"
                  >
                    Priority
                  </label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none"
                    id="task-priority"
                    onChange={(event) =>
                      setDraftTask((current) => ({
                        ...current,
                        priority: event.target.value as TaskPriority,
                      }))
                    }
                    value={draftTask.priority}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="task-points"
                  >
                    Story points
                  </label>
                  <Input
                    id="task-points"
                    min={1}
                    onChange={(event) =>
                      setDraftTask((current) => ({
                        ...current,
                        storyPoints: Number(event.target.value) || 1,
                      }))
                    }
                    type="number"
                    value={draftTask.storyPoints}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  onClick={() => setCreateTaskOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>
                  <Plus className="h-4 w-4" />
                  Create task
                </Button>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
