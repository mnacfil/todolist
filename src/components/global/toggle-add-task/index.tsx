"use client";

import React, { useState } from "react";
import AddTaskForm, { TaskPlace } from "@/components/form/add-task";
import { PlusIcon } from "lucide-react";

type Props = {
  userId: string;
  taskId?: string;
  projectId?: string;
  sectionId?: string;
  type?: "main-task" | "sub-task";
  place?: TaskPlace;
};

const ToggleAddTask = ({
  userId,
  taskId,
  projectId,
  sectionId,
  place = TaskPlace.MAIN,
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
          sectionId={sectionId}
          place={place}
          onCancel={() => setIsAddingTask(false)}
          type={type}
        />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer group pl-1.5"
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
