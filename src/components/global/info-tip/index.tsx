import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  triggerClassName?: string;
  children: ReactNode;
  contentClassName?: string;
};

const InfoTip = ({
  children,
  trigger,
  triggerClassName,
  contentClassName,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className={clsx("", triggerClassName)}>
        {trigger}
      </TooltipTrigger>
      <TooltipContent className={clsx("", contentClassName)}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoTip;
