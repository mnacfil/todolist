import Icon from "@/components/icons/icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import { LinksAndActions } from "./links-and-actions";
import Projects from "./my-projects";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icon icon="OpenClosedPanel" />
      </SheetTrigger>
      <SheetContent className="w-[260px] bg-orange-50" side="left">
        <div className="">
          <UserDropdown />
          <LinksAndActions currentPathName={""} />
          <Projects />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
