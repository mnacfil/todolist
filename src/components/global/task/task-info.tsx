import React from "react";
import task from ".";
import { Task } from "@prisma/client";

type Props = {
  onClick: () => void;
  task: Task;
};

const TaskInfo = ({ task, onClick }: Props) => {
  return (
    <div className="flex flex-col gap-[0.5px]" onClick={onClick}>
      <h4 className="text-sm font-light">{task.title}</h4>
      <p className="p-0 text-xs font-light text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskInfo;
