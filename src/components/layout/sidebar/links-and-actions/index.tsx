"use client";

import { sidebarLinks } from "@/components/constants/sidebar";
import clsx from "clsx";
import Link from "next/link";
import { Item } from "./item";
import AddTaskForm from "@/components/form/add-task";
import CustomDialog from "@/components/global/custom-dialog";

type Props = {
  currentPathName: string;
};

export const LinksAndActions = ({ currentPathName }: Props) => {
  return (
    <div className="w-full flex flex-col mb-5 mt-2">
      <Item title="Add task" icon="Plus" children={<AddTaskForm userId="" />} />
      <Item title="Search" icon="Search" />
      {sidebarLinks.map((link) => {
        const isActive = link.href === currentPathName;
        return (
          <Item
            key={link.title}
            type="link"
            icon={link.icon}
            data={3}
            title={link.title}
            href={link.href}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};
