import IconRenderer from "@/components/global/icon-renderer";
import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  CopyPlus,
} from "lucide-react";
import React from "react";

type Props = {};

const HeaderActions = (props: Props) => {
  return (
    <>
      <DropdownMenuLabel className="text-xs text-primary">
        Added on 10 Nov . 12:25
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem Icon={<Icon icon="Copy" />} label="Duplicate" />
        <MoreActionItem
          Icon={<Icon icon="Link" />}
          label="Copy link to task"
          shortcut="CltrC"
        />
        <MoreActionItem
          Icon={<Icon icon="Copy" />}
          label="Add comments via email"
        />
        <MoreActionItem
          Icon={<Icon icon="Activity" />}
          label="View task activity"
        />
        <MoreActionItem Icon={<Icon icon="Print" />} label="Print" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Puzzle" />}
          label="Add extension..."
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Delete" />}
          label="Delete"
          shortcut="Delete"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default HeaderActions;
