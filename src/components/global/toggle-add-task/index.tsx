"use client";

import React, { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import { PlusIcon } from "lucide-react";
import { TaskType } from "../task";

type Props = {
  userId: string;
  isAddingSubTask?: boolean;
  currentTask?: any;
  type?: TaskType;
};

const ToggleAddTask = ({
  userId,
  isAddingSubTask = false,
  currentTask,
  type = TaskType.MAIN_TASK,
}: Props) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <>
      {isAddingTask ? (
        <AddTaskForm
          userId={userId}
          onCancel={() => setIsAddingTask(false)}
          isAddingSubTask={isAddingSubTask}
          currentTask={currentTask}
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
            {type === TaskType.MAIN_TASK ? "Add task" : "Add sub task"}
          </p>
        </div>
      )}
    </>
  );
};

export default ToggleAddTask;
