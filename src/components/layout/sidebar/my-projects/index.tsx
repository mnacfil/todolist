"use client";

import { projectsLinks } from "@/components/constants/sidebar";
import MoreActions from "@/components/global/more-actions";
import clsx from "clsx";
import { Link, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import ProjectsAction from "./actions/projects";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProjectForm from "@/components/form/add-project";
import { Separator } from "@/components/ui/separator";

type Props = {};

const MyProjects = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-500">My Projects</p>
          <span className="text-xs text-gray-500 p-[2px] bg-gray-100 rounded-sm font-semibold">
            USED: 5/5
          </span>
        </div>
        <Dialog>
          <DialogTrigger>
            <Plus size={16} className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="p-0">
            <h3 className="pt-4 pl-4">Add project</h3>
            <Separator />
            <div className="px-4 pb-4">
              <AddProjectForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col w-full">
        {projectsLinks.map((link) => {
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
    </div>
  );
};

export default MyProjects;
