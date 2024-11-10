"use client";

import { dueDates, priorities } from "@/components/constants";
import ActionRow from "@/components/global/action-row";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Edit,
  List,
  MoveUp,
  Flag,
  AlarmClock,
  Grip,
  CopyPlus,
  Link,
  Trash,
} from "lucide-react";
import React from "react";
import task from "../..";
import { useTask } from "@/hooks/task";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreActionItem from "@/components/global/more-actions/item";

type Props = {
  userId: string;
};

const TaskActions = ({ userId }: Props) => {
  const { isDeleting, isPending, mutate, deleteMutate } = useTask(userId);

  const activePriority = "P4";

  const onDuplicateTask = async () => {
    // mutate({
    //   title: task.title || "",
    //   description: task?.description || "",
    //   priority: task?.priority || "",
    //   author: {
    //     connect: {
    //       clerkId: userId,
    //     },
    //   },
    // });
  };

  const handleSetPriority = async (priority: string) => {};

  const handleDueDate = async () => {};

  const onEdit = () => {};

  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem iconName="pencil" label="Edit" shortcut="Ctrl E" />
        <MoreActionItem iconName="list" label="Go to project" shortcut="G" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem iconName="sun" label="Due date" shortcut="T" />
        <MoreActionItem iconName="list" label="Priority" shortcut="Y" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem iconName="alarm-clock" label="Reminders" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem iconName="move" label="Move to..." shortcut="V" />
        <MoreActionItem iconName="copy-plus" label="Duplicate" />
        <MoreActionItem
          iconName="link"
          label="Copy link to task"
          shortcut="CtrlC"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          iconName="puzzle"
          label="Add extension..."
          shortcut="Delete"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          iconName="trash-2"
          label="Delete"
          color="text-red-500"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default TaskActions;
