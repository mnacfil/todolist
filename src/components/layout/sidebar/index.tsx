"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CirclePlus, PanelRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UserDropdown } from "./user-dropdown";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import Projects from "./my-projects";
import { LinksAndActions } from "./links-and-actions";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import MobileSidebar from "./mobile-sidebar";
import Icon from "@/components/icons/icon";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const { user } = useUser();

  return (
    <div className="h-screen">
      <div className="sm:hidden block">
        <MobileSidebar />
      </div>
      {open ? (
        <div
          className={clsx(
            open ? "translate-x-0" : "-translate-x-full",
            "w-[260px] h-screen hidden sm:block bg-orange-50/50 p-4 transition-all duration-300"
          )}
        >
          <div className="flex items-center justify-between">
            <UserDropdown />
            <div>
              <Icon icon="OpenClosedPanel" onClick={() => setOpen(false)} />
            </div>
          </div>
          <LinksAndActions currentPathName={pathname} />
          <Projects />
        </div>
      ) : (
        <div className="pt-5 pl-5">
          <Icon icon="OpenClosedPanel" onClick={() => setOpen(true)} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
