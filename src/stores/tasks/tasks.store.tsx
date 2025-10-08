import { create } from "zustand";
import { Task } from "../../interfaces";
import { StateCreator } from "zustand";

interface TaskState {
    tasks: Record<string, Task>; //  Es lo mismo que usar { [key: string]: Task},
}

const storeApi: StateCreator<TaskState> = (set) => ({
    
    tasks: {
        "A-1": { id: "A-1", title: "Task 1", status: "open" },
        "A-2": { id: "A-2", title: "Task 2", status: "in-progress" },
        "A-3": { id: "A-3", title: "Task 3", status: "open" },
        "A-4": { id: "A-4", title: "Task 4", status: "open" },
    },
});


// Es importante importarlo como un hook usando la convención "use"
// para aplicar correctamente las reglas de los hooks de React
export const useTasksStore = create<TaskState>()(storeApi);