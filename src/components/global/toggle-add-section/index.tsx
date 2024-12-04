"use client";

import SectionForm from "@/components/form/section";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type Props = {
  projectId: string;
};

const ToggleAddSection = ({ projectId }: Props) => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  return (
    <>
      {isAddingSection ? (
        <SectionForm
          projectId={projectId}
          onCancel={() => setIsAddingSection(false)}
        />
      ) : (
        <div
          onClick={() => setIsAddingSection(true)}
          className="relative transition-all duration-300 opacity-0 hover:opacity-100 cursor-pointer"
        >
          <Separator className=" bg-red-500" />
          <p className="p-2 text-xs text-red-600 font-semibold absolute top-[-15px] left-1/2 -translate-x-1/2 z-10 bg-white">
            Add section
          </p>
        </div>
      )}
    </>
  );
};

export default ToggleAddSection;
