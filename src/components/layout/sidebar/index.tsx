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

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const { user } = useUser();

  // useEffect(() => {
  //   const onResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", onResize);

  //   return () => window.removeEventListener("resize", onResize);
  // }, []);

  return (
    <div className="h-screen">
      <div className="sm:hidden block p-4">
        {windowWidth <= 640 ? (
          <Sheet>
            <SheetTrigger asChild>
              <PanelRight className="w-4 h-4 opacity-50 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="w-[250px]" side="left">
              <SheetHeader>
                <SheetTitle>My Name</SheetTitle>
              </SheetHeader>
              <div>More Content</div>
            </SheetContent>
          </Sheet>
        ) : (
          <PanelRight
            className="w-4 h-4 opacity-50 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      {open ? (
        <div className="w-[280px] h-screen hidden sm:block bg-orange-50/50  p-4">
          <div className="flex items-center justify-between">
            <UserDropdown />
            <div>
              <PanelRight
                className="w-4 h-4 opacity-50 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center space-x-1 cursor-pointer my-3">
                <CirclePlus className="w-6 h-6 ml-[-3px] fill-red-500 text-white" />
                <p className="text-sm font-semibold file:text-red-800">
                  Add task
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              {/* <AddTask user={user} /> */}
              <p>Add task</p>
            </DialogContent>
          </Dialog>
          <LinksAndActions currentPathName={pathname} />

          <Projects />
        </div>
      ) : (
        <div className="p-4">
          {windowWidth <= 640 ? (
            <Sheet>
              <SheetTrigger asChild>
                <PanelRight className="w-4 h-4 opacity-50 cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="w-[250px]" side="left">
                <SheetHeader>
                  <SheetTitle>My Name</SheetTitle>
                </SheetHeader>
                <div>More Content</div>
              </SheetContent>
            </Sheet>
          ) : (
            <PanelRight
              className="w-4 h-4 opacity-50 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
