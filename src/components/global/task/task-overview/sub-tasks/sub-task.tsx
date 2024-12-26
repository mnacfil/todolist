"use client";

import MoreActions from "@/components/global/more-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Edit2, Calendar, MessageSquare } from "lucide-react";
import { TaskActions } from "../actions";
import { useSubTask } from "@/hooks/task";
import { Prisma, SubTask as SubTaskType } from "@prisma/client";
import { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import HoverActions from "../../hover-actions";
import clsx from "clsx";

type Props = {
  taskId: string;
  userId: string;
  subTask: SubTaskType;
};

const SubTask = ({ subTask, taskId, userId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { subTaskMutation } = useSubTask(taskId);
  const [isHover, setIsHover] = useState(false);

  const handleDelete = () => {
    subTaskMutation.delete.mutate({
      subTaskId: subTask.id as string,
      taskId,
    });
  };

  return (
    <>
      {isEditing ? (
        <AddTaskForm
          userId={userId}
          taskId={taskId}
          currentTask={subTask}
          isEditing={isEditing}
          onCancel={() => {
            setIsEditing(false);
            setIsHover(false);
          }}
          type="sub-task"
        />
      ) : (
        <div
          className="w-full flex items-center justify-between"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex gap-2 py-2">
            <Label htmlFor="subtaskCheckbox">
              <Checkbox
                id="subtaskCheckbox"
                className="rounded-full w-4 h-4 opacity-50 mt-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
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
          <div
            className={clsx(
              "flex items-center gap-2",
              isHover ? "opacity-100" : "opacity-0"
            )}
          >
            <HoverActions
              key={`hover-action-${subTask.id}`}
              onComment={() => {}}
              onDelete={handleDelete}
              onEdit={() => setIsEditing(true)}
              onSetDate={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubTask;
