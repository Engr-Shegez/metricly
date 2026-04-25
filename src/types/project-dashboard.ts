export type TaskPriority = "high" | "medium" | "low";

export type TaskStatus = "backlog" | "in_progress" | "review" | "done";

export type ProjectHealth = "on-track" | "watch" | "critical";

export interface DashboardUser {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  avatarColor: string;
  cursorColor: string;
  focusHours: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  client: string;
  progress: number;
  dueDate: string;
  health: ProjectHealth;
  members: string[];
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  storyPoints: number;
  tags: string[];
}

export interface ClientSentimentDatum {
  label: string;
  feedbackScore: number;
}

export interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  time: string;
}

export interface PresenceCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  lastSeen: number;
}
