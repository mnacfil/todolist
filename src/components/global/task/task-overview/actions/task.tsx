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
import Icon from "@/components/icons/icon";

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
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
          label="Edit"
          shortcut="Ctrl E"
        />
        <MoreActionItem
          Icon={<Icon icon="Goto" />}
          label="Go to project"
          shortcut="G"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Sun" />}
          label="Due date"
          shortcut="T"
        />
        <MoreActionItem
          Icon={<Icon icon="Flag" />}
          label="Priority"
          shortcut="Y"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem Icon={<Icon icon="Reminder" />} label="Reminders" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Move" />}
          label="Move to..."
          shortcut="V"
        />
        <MoreActionItem Icon={<Icon icon="Duplicate" />} label="Duplicate" />
        <MoreActionItem
          Icon={<Icon icon="Link" />}
          label="Copy link to task"
          shortcut="CtrlC"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Puzzle" />}
          label="Add extension..."
          shortcut="Delete"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Delete" />}
          label="Delete"
          color="text-red-500"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default TaskActions;
