export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export type TaskStatus = "all" | "completed" | "pending";