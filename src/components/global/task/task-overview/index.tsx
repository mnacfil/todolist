"use client";

import React, { SetStateAction } from "react";
import TaskOverviewForm from "@/components/form/task-overview";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import SubTasks from "./sub-tasks";
import Comments from "./comments";
import ToggleComment from "./toggle-comment";

type Props = {
  userId: string;
  task: any;
  onOpenChange?: React.Dispatch<SetStateAction<boolean>>;
};

const TaskOverview = ({ userId, task }: Props) => {
  return (
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
  );
};

export default TaskOverview;
