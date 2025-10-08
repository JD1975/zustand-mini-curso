import { DragEvent, useState } from "react";
import Swal from "sweetalert2";

import { useTasksStore } from "../../../stores";
import { TaskStatus } from "../../../interfaces";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
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

  return {
    IsDraggingTaskId,
    onTaskDrop,
    addTask,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDrop,
    handleDragLeave,
  };
};
