import IconRenderer from "@/components/global/icon-renderer";
import MoreActionItem from "@/components/global/more-actions/item";
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
        <MoreActionItem iconName="copy-plus" label="Duplicate" />
        <MoreActionItem
          iconName="link"
          label="Copy link to task"
          shortcut="CltrC"
        />
        <MoreActionItem iconName="mail" label="Add comments via email" />
        <MoreActionItem iconName="square-activity" label="View task activity" />
        <MoreActionItem iconName="printer" label="Print" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem iconName="puzzle" label="Add extension..." />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem iconName="trash-2" label="Delete" shortcut="Delete" />
      </DropdownMenuGroup>
    </>
  );
};

export default HeaderActions;
