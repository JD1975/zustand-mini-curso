import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { produce } from "immer";
// import { immer } from "zustand/middleware/immer";

import { Task, TaskStatus } from "../../interfaces";

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

  // Add Task
  addTask: (title: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "A-1": { id: "A-1", title: "Task 1", status: "open" as TaskStatus },
    "A-2": { id: "A-2", title: "Task 2", status: "in-progress" as TaskStatus },
    "A-3": { id: "A-3", title: "Task 3", status: "open" as TaskStatus },
    "A-4": { id: "A-4", title: "Task 4", status: "open" as TaskStatus },
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
    // * Usando spread operator, forma nativa de Zustand
    // ✅ CORRECTO: Crear un nuevo objeto sin mutar el original
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          status: status,
        },
      },
    }));

    // * Usando produce (Metodo mas moderno y recomendado)
    // ✅ Con produce puedes mutar directamente dentro de produce
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[taskId].status = status;
    //   })
    // );
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().setTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },

  // Add Task
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuid(), title, status };

    // * Usando spread operator, forma nativa de Zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));

    // * Usando produce (Metodo mas moderno y recomendado
    set(
      produce((state: TaskState) => {
        state.tasks[newTask.id] = newTask;
      })
    );

    // * Usando immer middleware de Zustand
    // Funciona, pero nos produce errores de tipado en TS
    // set((state) => {
    //   state.tasks[newTask.id] = newTask;
    // });
  },
});

// Es importante importarlo como un hook usando la convención "use"
// para aplicar correctamente las reglas de los hooks de React
// export const useTasksStore = create<TaskState>()(devtools(immer(storeApi)));
export const useTasksStore = create<TaskState>()(devtools(storeApi));
