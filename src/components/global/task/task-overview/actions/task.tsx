"use client";

import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";
import Alert from "@/components/global/alert";

type Props = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskActions = ({ title, onEdit, onDelete }: Props) => {
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
        <Alert
          title="Delete section?"
          description={
            <p className="text-gray-700">
              The <strong className="text-gray-800">{title}</strong> task will
              be permanently deleted.
            </p>
          }
          trigger={
            <div className="relative flex gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-slate-100">
              <div className="flex gap-1 items-center ">
                <Icon icon="Delete" />
                Delete
              </div>
            </div>
          }
          onCancel={() => {}}
          onDelete={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default TaskActions;
