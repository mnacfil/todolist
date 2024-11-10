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
import { Calendar, Edit2, Inbox, InboxIcon, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import AddTaskForm from "@/components/form/add-task";
import { useTask } from "@/hooks/task";
import { Separator } from "@radix-ui/react-separator";
import dynamic from "next/dynamic";
import MoreActions from "../more-actions";
import { HeaderActions, TaskActions } from "./task-overview/actions";

type Props = {
  task: any;
  userId: string;
};

// TODO
// when the request is fail, it still show up in the UI
// but when you refresh it not.
// when the request is fail. it must be not show in the UI

const TaskOverview = dynamic(() => import("./task-overview"));

const Task = ({ task, userId }: Props) => {
  const { deleteMutate } = useTask(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const onCancelTask = () => setIsEditing(false);
  const onEditTask = () => setIsEditing(true);

  return (
    <>
      {isEditing ? (
        <AddTaskForm
          userId={userId}
          currentTask={task}
          isEditing={isEditing}
          onCancel={onCancelTask}
        />
      ) : (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="p-2 flex flex-col gap-1 group">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Label htmlFor="taskCheckbox">
                  <Checkbox
                    id="taskCheckbox"
                    className="rounded-full text-gray-500!"
                    onCheckedChange={() => deleteMutate(task?.id as string)}
                    color="red"
                  />
                </Label>
                <DialogTrigger
                  asChild
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div
                    className="flex flex-col gap-[0.5px]"
                    onClick={() => setShowDialog(true)}
                  >
                    <h4 className="text-sm font-light">{task.title}</h4>
                    <p className="p-0 text-xs font-light text-gray-500">
                      {task.description}
                    </p>
                  </div>
                </DialogTrigger>
              </div>
              <div className="hidden group-hover:flex group-hover:items-center group-hover:gap-1">
                <Edit2
                  className="text-gray-400 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-950"
                  size={16}
                  onClick={onEditTask}
                />
                <Calendar className="text-gray-400" size={16} />
                <MessageSquare className="text-gray-400" size={16} />
                <MoreActions>
                  <TaskActions userId={userId} />
                </MoreActions>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-1">
              <p className="ml-auto text-xs">inbox</p>
              <InboxIcon className="text-gray-500" size={12} />
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
              {/* <div className="text-sm font-light">more actions</div> */}
            </DialogHeader>
            <Separator className="h-[1px] bg-gray-200" />
            <div className="flex flex-row flex-1">
              <TaskOverview
                userId={userId}
                task={task}
                onOpenChange={setShowDialog}
              />
              <div className="bg-orange-100/50 min-w-[300px] h-auto">Side</div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Task;
