"use client";

import React, { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import { PlusIcon } from "lucide-react";

type Props = {
  userId: string;
  taskId?: string;
  projectId?: string;
  type?: "main-task" | "sub-task";
};

const ToggleAddTask = ({
  userId,
  taskId,
  projectId,
  type = "main-task",
}: Props) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <>
      {isAddingTask ? (
        <AddTaskForm
          userId={userId}
          taskId={taskId}
          projectId={projectId}
          onCancel={() => setIsAddingTask(false)}
          type={type}
        />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={() => setIsAddingTask(true)}
        >
          <PlusIcon
            size={16}
            className="text-red-500 font-light group-hover:text-white group-hover:bg-red-500 group-hover:rounded-full"
          />
          <p className="text-gray-500 text-xs font-light group-hover:text-red-500">
            {type === "main-task" ? "Add task" : "Add sub task"}
          </p>
        </div>
      )}
    </>
  );
};

export default ToggleAddTask;
