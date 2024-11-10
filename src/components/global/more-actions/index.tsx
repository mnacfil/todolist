import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Ellipsis } from "lucide-react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  trigger?: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
};

const MoreActions = ({
  trigger,
  triggerClassName,
  contentClassName,
  children,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {trigger || (
          <Ellipsis size={16} className="text-gray-400 cursor-pointer" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={clsx("w-56", contentClassName)}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreActions;
