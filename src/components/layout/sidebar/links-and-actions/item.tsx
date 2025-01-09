import VisualHidden from "@/components/global/visual-hidden";
import Icon from "@/components/icons/icon";
import { IconType } from "@/components/icons/icon-type";
import { Dialog, DialogContent, DialogTrigger, DialogTitle} from "@/components/ui/dialog";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon: IconType;
  title: string;
  children?: ReactNode;
  data?: number;
  type?: "link" | "action";
  href?: string;
  isActive?: boolean;
};

export const Item = ({
  data,
  icon,
  isActive,
  children,
  type = "action",
  href,
  title
}: Props) => {
  if (type === "link" && href) {
    return (
      <Link
        href={href}
        className={clsx(
          "flex items-center justify-between p-1.5 hover:bg-gray-100/50 rounded-sm",
          isActive && "bg-orange-400/10 hover:bg-orange-400/10"
        )}
      >
        <div className="flex items-center space-x-2">
          <Icon icon={icon} />
          <p
            className={clsx("text-primary text-sm", isActive && "text-red-800")}
          >
            {title}
          </p>
        </div>
        <p
          className={clsx(
            "text-muted-foreground/50 text-xs",
            isActive && "text-red-800"
          )}
        >
          {data}
        </p>
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-between p-1.5 hover:bg-gray-100/50 rounded-sm">
          <div className="flex items-center space-x-2">
            <Icon icon={icon} />
            <p className={clsx("text-primary text-sm")}>{title}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 m-0">
        <VisualHidden>

        <DialogTitle>{title}</DialogTitle>
        </VisualHidden>
        {children}</DialogContent>
    </Dialog>
  );
};
