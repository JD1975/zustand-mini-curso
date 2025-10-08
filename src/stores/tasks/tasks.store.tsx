import { create } from "zustand";
import { Task } from "../../interfaces";

interface TaskState {
    tasks: Record<string, Task>;
}

const storeApi: StateCreator<TaskState> = (set) => ({
    tasks: {
        1: { id: 1, title: "Learn Zustand", status: "completed" },
        2: { id: 2, title: "Build a project", status: "pending" },
    },
});

export const useTasksStore = create<TaskState>()(storeApi);