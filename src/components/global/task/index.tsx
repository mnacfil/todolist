"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Inbox, InboxIcon } from "lucide-react";
import React, { useState } from "react";
import AddTaskForm, { TaskPlace } from "@/components/form/add-task";
import { useTask } from "@/hooks/task";
import { Separator } from "@radix-ui/react-separator";
import dynamic from "next/dynamic";
import MoreActions from "../more-actions";
import { HeaderActions } from "./task-overview/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTaskCommentsOptions,
  getTaskSubTasksOptions,
} from "@/lib/react-query/options";
import { useProjectTask } from "@/hooks/project";
import { useSectionTask } from "@/hooks/section";
import HoverActions from "./hover-actions";
import TaskInfo from "./task-info";
import clsx from "clsx";
import Icon from "@/components/icons/icon";

export enum TaskType {
  MAIN_TASK,
  SUB_TASK,
}

type Props = {
  task: any;
  userId: string;
  projectId?: string;
  sectionId?: string;
  place?: TaskPlace;
};

const TaskOverview = dynamic(() => import("./task-overview"));

const Task = ({
  task,
  userId,
  projectId,
  sectionId,
  place = TaskPlace.MAIN,
}: Props) => {
  const queryClient = useQueryClient();
  const subtasksQuery = useQuery(getTaskSubTasksOptions(task?.id as string));
  const commentsQuery = useQuery(getTaskCommentsOptions(task?.id as string));
  const { deleteMutate } = useTask();
  const { deleteProjectTaskMutation } = useProjectTask(projectId ?? "");
  const { deleteSectionTaskMutation } = useSectionTask(
    projectId ?? "",
    sectionId ?? ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const onCancelTask = () => setIsEditing(false);
  const onEdit = () => {
    setIsEditing(true);
  };

  const onSetDate = () => {};
  const onComment = () => {};

  const handleDelete = () => {
    if (place === TaskPlace.MAIN) {
      deleteMutate(task?.id as string);
    }
    if (place === TaskPlace.PROJECT) {
      deleteProjectTaskMutation.mutate(task?.id as string);
    }
    if (place === TaskPlace.SECTION) {
      deleteSectionTaskMutation.mutate({
        id: task?.id as string,
        sectionId: sectionId ?? "",
      });
    }
  };

  const handlePrefetchSubtasksAndComments = async () => {
    await queryClient.prefetchQuery(getTaskSubTasksOptions(task.id));
    await queryClient.prefetchQuery(getTaskCommentsOptions(task.id));
  };

  const totalSubtasks = subtasksQuery.data?.subTasks?.length ?? 0;
  const totalCompletedSubtasks =
    subtasksQuery.data?.subTasks?.filter((subtask) => subtask.completed)
      .length ?? 0;
  const totalComments = commentsQuery.data?.comments?.length ?? 0;

  return (
    <>
      {isEditing ? (
        <AddTaskForm
          userId={userId}
          projectId={projectId}
          sectionId={sectionId}
          currentTask={task}
          isEditing={isEditing}
          onCancel={onCancelTask}
          place={place}
        />
      ) : (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="p-2 flex flex-col gap-1">
            <div
              className="flex justify-between items-center cursor-pointer"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className="flex gap-2">
                <Label htmlFor="taskCheckbox">
                  <Checkbox
                    id="taskCheckbox"
                    className="rounded-full text-gray-500!"
                    onCheckedChange={handleDelete}
                    color="red"
                  />
                </Label>
                <DialogTrigger
                  asChild
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseEnter={handlePrefetchSubtasksAndComments}
                >
                  <TaskInfo task={task} onClick={() => setShowDialog(true)} />
                </DialogTrigger>
              </div>
              <div
                className={clsx(
                  "flex items-center gap-2",
                  isHover ? "opacity-100" : "opacity-0"
                )}
              >
                <HoverActions
                  key={task.id}
                  onComment={onComment}
                  onEdit={onEdit}
                  onSetDate={onSetDate}
                  onDelete={handleDelete}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pl-6">
              <DialogTrigger
                asChild
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onMouseEnter={handlePrefetchSubtasksAndComments}
              >
                <div className="flex items-center space-x-2">
                  {totalSubtasks > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon icon="Subtasks" />
                      <span className="text-[11px] leading-[14px]">
                        {totalCompletedSubtasks}/{totalSubtasks}
                      </span>
                    </div>
                  )}
                  {totalComments > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon icon="Message" />
                      <span className="text-[11px] leading-[14px]">
                        {totalComments}
                      </span>
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <div className="flex-1 flex items-center gap-1">
                <p className="ml-auto text-xs">inbox</p>
                <InboxIcon className="text-gray-500" size={12} />
              </div>
            </div>
          </div>
          <DialogContent className="w-full flex flex-col sm:max-w-4xl p-0 min-h-[80%] max-h-[80%] gap-0">
            <DialogHeader className="flex px-4 py-2  w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 opacity-50" />
                  <DialogTitle className="text-sm">Inbox</DialogTitle>
                </div>
                <div className="mr-10">
                  <MoreActions>
                    <HeaderActions />
                  </MoreActions>
                </div>
              </div>
            </DialogHeader>
            <Separator className="h-[1px] bg-gray-200" />
            <TaskOverview userId={userId} task={task} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Task;
