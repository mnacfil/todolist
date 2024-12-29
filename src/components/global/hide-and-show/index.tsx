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
  showChildren?: boolean;
  hasActions?: boolean;
  Actions?: ReactNode;
  EditingForm?: ReactNode;
  isEditing?: boolean;
};

const HideAndShow = ({
  children,
  label,
  subLabel,
  showChildren = true,
  hasActions = false,
  Actions,
  isEditing = false,
  EditingForm,
}: Props) => {
  const [open, setOpen] = useState(showChildren);

  return (
    <>
      {isEditing ? (
        <>
          {EditingForm}
          {open && <Separator />}
          {open && children}
        </>
      ) : (
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
                <p className="text-sm font-semibold text-slate-600">{label} </p>
                <span className="text-muted-foreground text-xs">
                  {subLabel}
                </span>
              </div>
              {hasActions && <MoreActions>{Actions ?? <></>}</MoreActions>}
            </div>
            <Separator />
            {open && children}
          </div>
        </div>
      )}
    </>
  );
};

export default HideAndShow;
