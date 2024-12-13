import Icon from "@/components/icons/icon";
import { IconType } from "@/components/icons/icon-type";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  icon: IconType;
  title: string;
  data?: number;
  type?: "link" | "action";
  href?: string;
  isActive?: boolean;
};

export const Item = ({
  data,
  icon,
  isActive,
  title,
  type = "action",
  href,
}: Props) => {
  if (type === "link" && href) {
    return (
      <Link
        href={href}
        className="flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm"
      >
        <div className="flex items-center space-x-2">
          <Icon icon={icon} />
          <p className={clsx("text-primary text-sm")}>{title}</p>
        </div>
        <p className={clsx("text-muted-foreground/50 text-sm")}>{data}</p>
      </Link>
    );
  }
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm">
      <div className="flex items-center space-x-2">
        <Icon icon={icon} />
        <p className={clsx("text-primary text-sm")}>{title}</p>
      </div>
      <p className={clsx("text-muted-foreground/50 text-sm")}>{data}</p>
    </div>
  );
};
