import { DragEvent, useState } from "react";
import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import classNames from "classnames";
import Swal from "sweetalert2";

import { TaskStatus, Task } from "../../interfaces";

import { SingleTasks } from "./SingleTasks";
import { useTasksStore } from "../../stores";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  // Store or susbcriptions
  const IsDraggingTaskId = useTasksStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTasksStore((state) => state.onTaskDrop);
  const addTask = useTasksStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {

    const { isConfirmed, value } = await Swal.fire({
      title: "Agrega una tarea",
      input: "text",
      inputLabel: "Titulo de la tarea",
      inputPlaceholder: "Escribe el titulo",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar",
      inputValidator: (value) => {
        return !value && "Necesitas escribir un titulo para la tarea";
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOnDragOver(true);
    // console.log("Drag Over:", value);
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  return (
    <div
      className={classNames(
        "!text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] transition-all duration-300",
        {
          // Estilos cuando se está arrastrando una tarea
          "border-2 border-dashed border-blue-500 bg-blue-50 backdrop-blur-sm rounded-[20px] bg-blue-100/50":
            IsDraggingTaskId,
          // Estilo normal
          "border-2 border-gray-200": !IsDraggingTaskId,
          // Estilos cuando el drag está sobre este contenedor (hover drop zone)
          "!border-2 !border-solid !border-green-500 !bg-green-100 scale-105 shadow-2xl ring-4 ring-green-300 ring-opacity-50":
            IsDraggingTaskId && onDragOver,
        }
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button title="Add Task" onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTasks key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
