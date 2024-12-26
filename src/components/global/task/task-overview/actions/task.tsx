"use client";

import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const TaskActions = ({ onEdit, onDelete }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
          label="Edit"
          shortcut="Ctrl E"
          onClick={onEdit}
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
          onClick={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default TaskActions;
