"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Circle, Signal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { getProjectById } from "@/lib/project-dashboard-data";
import { cn } from "@/lib/utils";
import type {
  DashboardUser,
  KanbanTask,
  TaskPriority,
  TaskStatus,
} from "@/types/project-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const columns: { id: TaskStatus; label: string; hint: string }[] = [
  { id: "backlog", label: "Backlog", hint: "Need shaping" },
  { id: "in_progress", label: "In Progress", hint: "Active now" },
  { id: "review", label: "Review", hint: "Needs sign-off" },
  { id: "done", label: "Done", hint: "Shipped" },
];

const priorityStyles: Record<
  TaskPriority,
  { dot: string; label: string; badge: string }
> = {
  high: {
    dot: "text-rose-500",
    label: "High",
    badge:
      "border-rose-200/80 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-200",
  },
  medium: {
    dot: "text-amber-500",
    label: "Medium",
    badge:
      "border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200",
  },
  low: {
    dot: "text-emerald-500",
    label: "Low",
    badge:
      "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200",
  },
};

function TaskCard({
  task,
  users,
  dragOverlay = false,
}: {
  task: KanbanTask;
  users: DashboardUser[];
  dragOverlay?: boolean;
}) {
  const assignee = users.find((user) => user.id === task.assigneeId);
  const project = getProjectById(task.projectId);
  const priority = priorityStyles[task.priority];

  return (
    <motion.article
      layout
      className={cn(
        "group rounded-3xl border border-white/55 bg-white/80 p-3 text-left shadow-[0_18px_40px_rgba(60,44,21,0.10)] backdrop-blur-xl dark:border-white/8 dark:bg-[rgba(32,40,51,0.88)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
        dragOverlay && "rotate-[1.5deg] shadow-[0_22px_48px_rgba(15,23,42,0.22)]",
      )}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
                priority.badge,
              )}
            >
              <Circle className={cn("h-2.5 w-2.5 fill-current", priority.dot)} />
              {priority.label}
            </span>
            <span className="rounded-full border border-[var(--glass-border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {project?.name ?? "Project"}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-foreground">{task.title}</h4>
          <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
            {task.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground">
            Due {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-white/70 shadow-sm dark:border-white/10">
              <AvatarFallback
                className={cn("text-[10px] font-semibold text-white", assignee?.avatarColor)}
              >
                {assignee?.initials ?? "?"}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-medium text-muted-foreground">
              {assignee?.name ?? "Unassigned"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--glass-border)] bg-background/80 px-2.5 py-1 text-xs font-semibold text-foreground">
          {task.storyPoints} pts
        </div>
      </div>
    </motion.article>
  );
}

function SortableTaskCard({
  task,
  users,
}: {
  task: KanbanTask;
  users: DashboardUser[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none cursor-grab active:cursor-grabbing",
        isDragging && "opacity-45",
      )}
    >
      <TaskCard task={task} users={users} />
    </div>
  );
}

function BoardColumn({
  status,
  tasks,
  users,
}: {
  status: TaskStatus;
  tasks: KanbanTask[];
  users: DashboardUser[];
}) {
  const meta = columns.find((column) => column.id === status);
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <section
      aria-label={`${meta?.label} tasks`}
      className="glass-panel rounded-[30px] p-4"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{meta?.label}</h3>
          <p className="text-xs text-muted-foreground">{meta?.hint}</p>
        </div>
        <div className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
          {tasks.length}
        </div>
      </div>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-3 rounded-3xl">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <SortableTaskCard key={task.id} task={task} users={users} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-[var(--glass-border)] px-4 py-8 text-center text-xs text-muted-foreground">
              Drop a task here
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  );
}

export function KanbanBoard({
  tasks,
  users,
  syncingTaskId,
  onMoveTask,
}: {
  tasks: KanbanTask[];
  users: DashboardUser[];
  syncingTaskId?: string | null;
  onMoveTask: (taskId: string, status: TaskStatus, targetIndex: number) => void;
}) {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const tasksByColumn = useMemo(
    () =>
      columns.reduce(
        (accumulator, column) => {
          accumulator[column.id] = tasks.filter((task) => task.status === column.id);
          return accumulator;
        },
        {
          backlog: [],
          in_progress: [],
          review: [],
          done: [],
        } as Record<TaskStatus, KanbanTask[]>,
      ),
    [tasks],
  );

  const activeTask = activeTaskId
    ? tasks.find((task) => task.id === activeTaskId) ?? null
    : null;

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null);

    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeItem = tasks.find((task) => task.id === active.id);

    if (!activeItem) {
      return;
    }

    const overTask = tasks.find((task) => task.id === over.id);
    const targetStatus = overTask?.status ?? (over.id as TaskStatus);

    const targetColumnTasks = tasksByColumn[targetStatus];
    const targetIndex = overTask
      ? targetColumnTasks.findIndex((task) => task.id === overTask.id)
      : targetColumnTasks.length;

    if (
      activeItem.status === targetStatus &&
      targetColumnTasks.findIndex((task) => task.id === activeItem.id) === targetIndex
    ) {
      return;
    }

    onMoveTask(activeItem.id, targetStatus, targetIndex);
  };

  return (
    <section aria-label="Agile Kanban board" className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Agile View
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            High-density sprint board
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Optimistic task moves keep the board feeling instant while state syncs in the background.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--glass-border)] px-3 py-2 text-xs font-medium text-muted-foreground">
          <Signal className="h-4 w-4 text-emerald-500" />
          {syncingTaskId ? "Syncing task update..." : "Board is in sync"}
        </div>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={(event) => setActiveTaskId(String(event.active.id))}
        sensors={sensors}
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              status={column.id}
              tasks={tasksByColumn[column.id]}
              users={users}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard dragOverlay task={activeTask} users={users} /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
