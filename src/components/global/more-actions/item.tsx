import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  Icon: ReactNode;
  label: string;
  description?: string;
  shortcut?: string;
  onClick?: () => void;
  color?: string;
};

const MoreActionItem = ({
  Icon,
  label,
  description,
  shortcut,
  color,
  onClick,
}: Props) => {
  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      className={`${color} flex flex-col w-full gap-1 items-start cursor-pointer`}
    >
      <div className="flex gap-1 items-center justify-between w-full">
        {Icon}
        <span className={clsx("text-sm font-light", color ? color : "")}>
          {label}
        </span>
        <DropdownMenuShortcut className="text-xs font-thin">
          {shortcut}
        </DropdownMenuShortcut>
      </div>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </DropdownMenuItem>
  );
};

export default MoreActionItem;
