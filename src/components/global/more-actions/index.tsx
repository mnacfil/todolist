import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
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
  onClick?: () => void;
};

const MoreActions = ({
  trigger,
  triggerClassName,
  contentClassName,
  children,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName} asChild>
        {trigger || (
          <Ellipsis size={16} className="text-gray-400 cursor-pointer" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className={clsx("w-56", contentClassName)}>
          {children}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default MoreActions;
