import { create } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface TaskState {
  // state
  tasks: Record<string, Task>; //  Es lo mismo que usar { [key: string]: Task},

  // methods
  getTasksByStatus: (status: TaskStatus) => Task[];

  /* Drag and drop */
  draggingTaskId?: string;
  setDraggingTaskId: (taskId: string) => void;

  removeDraggingTaskId: () => void;

  setTaskStatus: (taskId: string, status: TaskStatus) => void;

  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "A-1": { id: "A-1", title: "Task 1", status: "open" },
    "A-2": { id: "A-2", title: "Task 2", status: "in-progress" },
    "A-3": { id: "A-3", title: "Task 3", status: "open" },
    "A-4": { id: "A-4", title: "Task 4", status: "open" },
  },

  /**
   * Método para filtrar tareas por status
   *
   * Esta función:
   * 1. Recibe un status como parámetro ("open", "in-progress", "done")
   * 2. Usa get() para acceder al estado actual del store
   * 3. Convierte el objeto tasks a un array con Object.values()
   * 4. Filtra las tareas que coincidan con el status solicitado
   * 5. Retorna el array filtrado
   *
   * IMPORTANTE: Esta función siempre retorna un NUEVO array (por el .filter)
   * Por eso NO debe llamarse DENTRO de un selector de useTasksStore,
   * sino que debe obtenerse la función primero y llamarla después.
   */
  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  /* Drag and drop */
  draggingTaskId: undefined,
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  setTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },

  onTaskDrop: (status: TaskStatus) =>{
    const taskId = get().draggingTaskId;
    if(!taskId) return;

    get().setTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

// Es importante importarlo como un hook usando la convención "use"
// para aplicar correctamente las reglas de los hooks de React
export const useTasksStore = create<TaskState>()(devtools(storeApi));
