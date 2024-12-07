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
import {
  favoriteLinks,
  projectsLinks,
  sidebarLinks,
} from "@/components/constants/sidebar";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import MyProjects from "./my-projects";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

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

          <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded-sm">
            <Search className="w-4 h-4 opacity-50" />
            <p className="text-primary text-sm">Search</p>
          </div>
          <div className="flex flex-col w-full">
            {sidebarLinks.map((link) => {
              const isActive = link.href === pathname;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={clsx(
                    `flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm`,
                    isActive ? "bg-orange-400/10" : "bg-none"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <link.Icon
                      className={clsx(
                        "w-4 h-4 opacity-50",
                        isActive && "text-red-700"
                      )}
                    />
                    <p
                      className={clsx(
                        "text-primary text-sm",
                        isActive && "text-red-800"
                      )}
                    >
                      {link.title}
                    </p>
                  </div>
                  <p
                    className={clsx(
                      "text-muted-foreground/50 text-sm",
                      isActive && "text-red-800"
                    )}
                  >
                    3
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold text-gray-500">Favorites</p>
            <div className="flex flex-col w-full space-y-3">
              {favoriteLinks.map((link) => {
                const isActive = link.href === pathname;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <link.Icon className="w-4 h-4 opacity-50" />
                      <p className="text-primary text-sm">{link.title}</p>
                    </div>
                    <p
                      className={clsx(
                        "text-muted-foreground/50 text-sm",
                        isActive && "text-red-800"
                      )}
                    >
                      3
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <MyProjects />
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
