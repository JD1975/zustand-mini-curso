import { JiraTasks } from "../../components";
import { useTasksStore } from "../../stores";

export const JiraPage = () => {
  /**
   * PASO 1: Obtener la FUNCIÓN del store (no su resultado)
   *
   * ❌ INCORRECTO (causa loop infinito):
   * const tasks = useTasksStore(state => state.getTasksByStatus("open"));
   * Problema: Llamas getTasksByStatus("open") DENTRO del selector
   * → Retorna un NUEVO array cada vez
   * → Zustand compara con Object.is() y detecta cambio constante
   * → Loop infinito de re-renders
   *
   * ✅ CORRECTO (esta línea):
   * Solo seleccionamos la FUNCIÓN getTasksByStatus (no la llamamos aún)
   * La función es ESTABLE (siempre es la misma referencia)
   * → No causa re-renders innecesarios
   */
  const getTasksByStatus = useTasksStore((state) => state.getTasksByStatus);

  /**
   * PASO 2: Llamar la función FUERA del selector
   *
   * Ahora sí llamamos getTasksByStatus con diferentes parámetros
   * Esto ocurre en el cuerpo del componente, NO en el selector de Zustand
   *
   * ¿Por qué funciona?
   * - La función getTasksByStatus accede al store internamente con get()
   * - Filtra las tasks según el status que le pasemos
   * - Retorna un nuevo array, pero eso está bien porque ya estamos
   *   fuera del selector de Zustand
   * - El componente se re-renderiza solo cuando las tasks realmente cambian
   */
  const pendingTasks = getTasksByStatus("open");
  const inProgressTaks = getTasksByStatus("in-progress");
  const doneTasks = getTasksByStatus("done");

  console.log(pendingTasks, inProgressTaks, doneTasks);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" tasks={pendingTasks} value="done" />

        <JiraTasks title="Avanzando" tasks={inProgressTaks} value="in-progress" />

        <JiraTasks title="Terminadas" tasks={doneTasks} value="done" />
      </div>
    </>
  );
};
