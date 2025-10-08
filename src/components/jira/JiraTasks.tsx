import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { TaskStatus, Task } from "../../interfaces";
import { SingleTasks } from "./SingleTasks";
import { DragEvent } from "react";

interface Props {
  title: string;
  value: TaskStatus;
  tasks: Task[];
}

export const JiraTasks = ({ title, value, tasks }: Props) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("Drag Over:", value);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // const taskId = e.dataTransfer.getData("text/plain");
    // console.log({ taskId, value });
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("Drag Leave:", value);
  };

  return (
    <div
      className="!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]"
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

        <button title="See more">
          <IoEllipsisHorizontalOutline />
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
