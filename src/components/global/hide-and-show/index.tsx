"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React, { ReactNode, useState } from "react";
import MoreActions from "../more-actions";

type Props = {
  label: string;
  subLabel: string;
  children: ReactNode;
  hasActions?: boolean;
  Actions?: ReactNode;
};

const HideAndShow = ({
  children,
  label,
  subLabel,
  hasActions = false,
  Actions,
}: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex gap-2 w-full">
        <ChevronRight
          size={18}
          className={`cursor-pointer text-gray-500 transition-all mt-[1.5px] ${clsx(
            {
              "rotate-90": open,
            }
          )}`}
          onClick={() => setOpen((prev) => !prev)}
        />
        <div className="flex-1">
          <div className="flex flex-1 justify-between items-center mb-2">
            <div
              className={`transition-all flex items-center gap-1 cursor-pointer ${clsx(
                {
                  "gap-2": !open,
                }
              )}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              <p className="text-xs font-semibold">{label} </p>
              <span className="text-muted-foreground text-[10px]">
                {subLabel}
              </span>
            </div>
            {hasActions && <MoreActions>{Actions ?? <></>}</MoreActions>}
          </div>
          <Separator />
          {open && children}
        </div>
      </div>
    </>
  );
};

export default HideAndShow;
