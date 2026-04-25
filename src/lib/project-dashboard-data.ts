import type {
  ActivityItem,
  ClientSentimentDatum,
  DashboardUser,
  KanbanTask,
  ProjectSummary,
  TaskPriority,
} from "@/types/project-dashboard";

export const dashboardUsers: DashboardUser[] = [
  {
    id: "u-1",
    name: "Maya Chen",
    role: "Product Lead",
    email: "maya@metricly.app",
    initials: "MC",
    avatarColor: "bg-amber-500",
    cursorColor: "text-amber-500",
    focusHours: "09:00 - 12:00",
  },
  {
    id: "u-2",
    name: "Jordan Cole",
    role: "Design Director",
    email: "jordan@metricly.app",
    initials: "JC",
    avatarColor: "bg-sky-500",
    cursorColor: "text-sky-500",
    focusHours: "13:00 - 16:00",
  },
  {
    id: "u-3",
    name: "Priya Singh",
    role: "Frontend Engineer",
    email: "priya@metricly.app",
    initials: "PS",
    avatarColor: "bg-rose-500",
    cursorColor: "text-rose-500",
    focusHours: "10:00 - 14:00",
  },
  {
    id: "u-4",
    name: "Ayo Bello",
    role: "Client Strategist",
    email: "ayo@metricly.app",
    initials: "AB",
    avatarColor: "bg-emerald-500",
    cursorColor: "text-emerald-500",
    focusHours: "11:30 - 15:00",
  },
];

export const dashboardProjects: ProjectSummary[] = [
  {
    id: "p-1",
    name: "Northstar Workspace",
    client: "Northstar Capital",
    progress: 78,
    dueDate: "2026-05-06",
    health: "on-track",
    members: ["u-1", "u-2", "u-3"],
  },
  {
    id: "p-2",
    name: "Atlas CRM Sync",
    client: "Atlas Freight",
    progress: 64,
    dueDate: "2026-05-10",
    health: "watch",
    members: ["u-1", "u-3", "u-4"],
  },
  {
    id: "p-3",
    name: "Luma Portal Refresh",
    client: "Luma Health",
    progress: 41,
    dueDate: "2026-05-15",
    health: "critical",
    members: ["u-2", "u-3", "u-4"],
  },
];

export const dashboardTasks: KanbanTask[] = [
  {
    id: "t-1",
    title: "Finalize sprint narrative for exec review",
    description: "Align the milestone story with client-facing launch dates.",
    status: "backlog",
    priority: "high",
    projectId: "p-1",
    assigneeId: "u-1",
    dueDate: "2026-04-26",
    storyPoints: 5,
    tags: ["Planning", "Executive"],
  },
  {
    id: "t-2",
    title: "Refine onboarding empty states",
    description: "Tighten visual hierarchy for first-run task boards.",
    status: "backlog",
    priority: "medium",
    projectId: "p-3",
    assigneeId: "u-2",
    dueDate: "2026-04-30",
    storyPoints: 3,
    tags: ["UX", "Polish"],
  },
  {
    id: "t-3",
    title: "Ship activity feed pagination",
    description: "Reduce payload size and stabilize infinite loading.",
    status: "in_progress",
    priority: "high",
    projectId: "p-2",
    assigneeId: "u-3",
    dueDate: "2026-04-27",
    storyPoints: 8,
    tags: ["Frontend", "API"],
  },
  {
    id: "t-4",
    title: "Map stakeholder feedback into roadmap themes",
    description: "Bucket comments and identify top three sentiment drivers.",
    status: "in_progress",
    priority: "medium",
    projectId: "p-1",
    assigneeId: "u-4",
    dueDate: "2026-04-29",
    storyPoints: 5,
    tags: ["Client", "Research"],
  },
  {
    id: "t-5",
    title: "QA draggable swimlane interactions",
    description: "Validate dense-card collisions and mobile drag handles.",
    status: "review",
    priority: "high",
    projectId: "p-1",
    assigneeId: "u-3",
    dueDate: "2026-04-28",
    storyPoints: 3,
    tags: ["QA", "Agile"],
  },
  {
    id: "t-6",
    title: "Approve revised client dashboard copy",
    description: "Resolve legal notes and publish approved phrasing.",
    status: "review",
    priority: "low",
    projectId: "p-3",
    assigneeId: "u-4",
    dueDate: "2026-05-02",
    storyPoints: 2,
    tags: ["Content", "Legal"],
  },
  {
    id: "t-7",
    title: "Launch workspace permissions matrix",
    description: "Complete the new role mapping and support docs.",
    status: "done",
    priority: "medium",
    projectId: "p-2",
    assigneeId: "u-1",
    dueDate: "2026-04-24",
    storyPoints: 5,
    tags: ["Security", "Docs"],
  },
  {
    id: "t-8",
    title: "Polish card hover states across board",
    description: "Calibrate density, contrast, and action affordances.",
    status: "done",
    priority: "low",
    projectId: "p-1",
    assigneeId: "u-2",
    dueDate: "2026-04-23",
    storyPoints: 1,
    tags: ["Design", "UI"],
  },
];

export const clientSentimentSeries: ClientSentimentDatum[] = [
  { label: "W1", feedbackScore: 6.4 },
  { label: "W2", feedbackScore: 6.9 },
  { label: "W3", feedbackScore: 7.1 },
  { label: "W4", feedbackScore: 7.6 },
  { label: "W5", feedbackScore: 8.2 },
  { label: "W6", feedbackScore: 8.4 },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "a-1",
    label: "Design review closed",
    detail: "Jordan merged the final navigation polish for Northstar Workspace.",
    time: "12m ago",
  },
  {
    id: "a-2",
    label: "Client call scheduled",
    detail: "Ayo booked a risk review for the Luma Portal refresh.",
    time: "38m ago",
  },
  {
    id: "a-3",
    label: "Build health recovered",
    detail: "Atlas CRM Sync is back to green after the API contract fix.",
    time: "1h ago",
  },
];

export const currentDashboardUser = dashboardUsers[0];

export const collaborationProfiles = dashboardUsers.map((user) => ({
  id: user.id,
  name: user.name,
  color: user.cursorColor,
}));

const priorityWeight: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function getPriorityRank(priority: TaskPriority) {
  return priorityWeight[priority];
}

export function getProjectById(projectId: string) {
  return dashboardProjects.find((project) => project.id === projectId);
}

export function getUserById(userId: string) {
  return dashboardUsers.find((user) => user.id === userId);
}

export function getNextActionTask(tasks: KanbanTask[], userId: string) {
  return [...tasks]
    .filter((task) => task.assigneeId === userId && task.status !== "done")
    .sort((left, right) => {
      const dueDateDelta =
        new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime();

      if (dueDateDelta !== 0) {
        return dueDateDelta;
      }

      return getPriorityRank(right.priority) - getPriorityRank(left.priority);
    })[0];
}
