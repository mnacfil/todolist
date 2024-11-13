"use client";

import HideAndShow from "@/components/global/hide-and-show";
import ToggleAddTask from "@/components/global/toggle-add-task";
import { Prisma } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useSubTask } from "@/hooks/task";
import { TaskType } from "../..";

type Props = {
  task: Prisma.TaskCreateInput;
  subTasks: Prisma.SubTaskCreateInput[];
  userId: string;
};

const SubTasks = ({ task, subTasks, userId }: Props) => {
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const { subTaskMutation } = useSubTask(userId);
  return (
    <div className="flex flex-col gap-4 w-full">
      {subTasks?.length > 0 ? (
        <HideAndShow label="Sub tasks" subLabel={`${0}/${subTasks.length}`}>
          <div className="divide-y flex flex-col">
            {subTasks.map((subTask) => (
              <div key={subTask.id} className="flex gap-2 py-2">
                <Label htmlFor="subtaskCheckbox">
                  <Checkbox
                    id="subtaskCheckbox"
                    className="rounded-full w-4 h-4 opacity-50 mt-[2px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      subTaskMutation.delete.mutate({
                        id: subTask.id as string,
                        taskId: task.id as string,
                      });
                    }}
                  />
                </Label>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs">{subTask.title}</h4>
                  <p className="text-muted-foreground text-[10px]">
                    {subTask.description}
                  </p>
                </div>
              </div>
            ))}
            <Separator className="mb-2" />
          </div>
          <ToggleAddTask
            userId={userId}
            isAddingSubTask={true}
            currentTask={task}
            type={TaskType.SUB_TASK}
          />
        </HideAndShow>
      ) : (
        <ToggleAddTask
          userId={userId}
          isAddingSubTask={true}
          currentTask={task}
          type={TaskType.SUB_TASK}
        />
      )}
    </div>
  );
};

export default SubTasks;
