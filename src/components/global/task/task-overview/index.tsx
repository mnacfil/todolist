"use client";

import React, { SetStateAction } from "react";
import TaskOverviewForm from "@/components/form/task-overview";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import SubTasks from "./sub-tasks";
import Comments from "./comments";
import ToggleComment from "./toggle-comment";
import Icon from "@/components/icons/icon";
import { Separator } from "@/components/ui/separator";
import { formatDueDate } from "@/lib/utils";

type Props = {
  userId: string;
  task: any;
  onOpenChange?: React.Dispatch<SetStateAction<boolean>>;
};

const TaskOverview = ({ userId, task }: Props) => {
  return (
    <div className="flex flex-row flex-1">
      {/* Left side */}
      <div className="flex-1 p-4">
        <div className="w-full flex flex-col">
          <div className="max-h-[500px] overflow-y-auto whitespace-nowrap scrollbar-thin">
            <div className="flex gap-1">
              <Label htmlFor="taskCheckbox">
                <Checkbox
                  id="taskCheckbox"
                  className="rounded-full w-4 h-4 opacity-50 mt-[18px]"
                  onClick={(e) => e.stopPropagation()}
                />
              </Label>
              <div className="flex-1 flex-col">
                <TaskOverviewForm task={task} userId={userId} />
                <div className="flex flex-col gap-4 w-full">
                  <SubTasks task={task} userId={userId} />
                  <Comments taskId={task?.id} userId={userId} />
                </div>
              </div>
            </div>
          </div>
          <div className="pl-11">
            <ToggleComment taskId={task?.id} userId={userId} />
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="bg-orange-50/50 min-w-[260px] h-auto">
        <div className="p-4  h-full">
          <div className="flex flex-col py-3 gap-2">
            <h5 className="text-sm text-slate-600">Project</h5>
            <div className="flex items-center gap-2">
              <Icon icon="Inbox" />
              <span className="text-xs text-slate-900">Inbox</span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col py-3 gap-2">
            <h5 className="text-sm text-slate-600">Due date</h5>
            {task?.dueDate && (
              <div className="flex items-center gap-2">
                <Icon icon="Date" />
                <span className="text-xs text-slate-900">
                  {formatDueDate(task?.dueDate)}
                </span>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col py-3 gap-2">
            <h5 className="text-sm text-slate-600">Priority</h5>
            <div className="flex items-center gap-2">
              <Icon icon="Flag" />
              <span className="text-xs text-slate-900">
                {task?.priority.toUpperCase()}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3 gap-2">
            <h5 className="text-sm text-slate-600">Labels</h5>
            <Icon icon="Plus" />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3 gap-2">
            <h5 className="text-sm text-slate-600">Reminders</h5>
            <Icon icon="Plus" />
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3 gap-2">
            <h5 className="text-sm text-slate-600">Location</h5>
            <Icon icon="Location" />
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
