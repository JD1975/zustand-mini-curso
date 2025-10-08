import { JiraTasks } from "../../components";
import { useTasksStore } from "../../stores";

export const JiraPage = () => {
  /**
   * ✅ SOLUCIÓN CORRECTA: Suscribirse al objeto tasks
   *
   * Al seleccionar state.tasks, el componente se SUSCRIBE a cambios en tasks
   * → Cuando tasks cambia (por setTaskStatus), Zustand detecta el cambio
   * → El componente se re-renderiza automáticamente
   * → Filtramos en el componente para obtener arrays actualizados
   *
   * ❌ Por qué la solución anterior NO funcionaba:
   * Al seleccionar solo la función getTasksByStatus, el componente NO se suscribía
   * a ningún cambio del estado → no había re-renders cuando tasks cambiaba
   */
  const tasks = useTasksStore((state) => state.tasks);

  /**
   * Filtrar las tareas por status directamente en el componente
   * Esto se ejecuta en cada render, pero solo cuando 'tasks' realmente cambia
   */
  const pendingTasks = Object.values(tasks).filter(
    (task) => task.status === "open"
  );
  const inProgressTaks = Object.values(tasks).filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = Object.values(tasks).filter(
    (task) => task.status === "done"
  );

  console.log(pendingTasks, inProgressTaks, doneTasks);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" tasks={pendingTasks} status="open" />

        <JiraTasks
          title="Avanzando"
          tasks={inProgressTaks}
          status="in-progress"
        />

        <JiraTasks title="Terminadas" tasks={doneTasks} status="done" />
      </div>
    </>
  );
};
