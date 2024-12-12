import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import IconRenderer from "../icon-renderer";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import clsx from "clsx";

type Props = {
  iconName: keyof typeof dynamicIconImports;
  label: string;
  description?: string;
  shortcut?: string;
  onClick?: () => void;
  color?: string;
};

const MoreActionItem = ({
  iconName,
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
      className={`${color} flex flex-col w-full gap-1 items-start`}
    >
      <div className="flex gap-1">
        <IconRenderer name={iconName} />
        <span className={clsx("text-xs ", color ? color : "")}>{label}</span>
        <DropdownMenuShortcut className="text-[10px] font-thin">
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
