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
  shortcut?: string;
  onClick?: () => void;
  color?: string;
};

const MoreActionItem = ({
  iconName,
  label,
  shortcut,
  color,
  onClick,
}: Props) => {
  return (
    <DropdownMenuItem onClick={onClick} className={color}>
      <IconRenderer name={iconName} />
      <span className={clsx("text-xs ", color ? color : "")}>{label}</span>
      <DropdownMenuShortcut className="text-[10px] font-thin">
        {shortcut}
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

export default MoreActionItem;
