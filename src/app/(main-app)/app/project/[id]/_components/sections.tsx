"use client";

import HideAndShow from "@/components/global/hide-and-show";
import { getProjectSectionsOptions } from "@/lib/react-query/options";
import { useQuery } from "@tanstack/react-query";
import SectionActions from "./section-actions";
import ToggleAddTask from "@/components/global/toggle-add-task";
import Task from "@/components/global/task";

type Props = {
  projectId: string;
};

const Sections = ({ projectId }: Props) => {
  const { data, isPending } = useQuery(
    getProjectSectionsOptions(projectId ?? "")
  );

  if (isPending) {
    return <p>Loading sections...</p>;
  }
  return (
    <div>
      {data?.data && data.data.length > 0 ? (
        <div className="flex flex-col gap-3 w-full">
          {data.data.map((section) => (
            <HideAndShow
              key={section.id}
              label={section.title}
              subLabel={section?.tasks?.length.toString() ?? "0"}
              hasActions={true}
              Actions={
                <SectionActions
                  onArchive={() => {}}
                  onCopyLink={() => {}}
                  onDelete={() => {}}
                  onDuplicate={() => {}}
                  onEdit={() => {}}
                  onMove={() => {}}
                  key={`${section.id}-actions`}
                />
              }
            >
              <div className="flex w-full gap-4 flex-col divide-y divide-slate-100">
                {section?.tasks &&
                  section.tasks.map((task) => (
                    <Task key={task.id} task={task} userId={""} />
                  ))}
              </div>
              <div className="py-2">
                <ToggleAddTask userId="" />
              </div>
            </HideAndShow>
          ))}
        </div>
      ) : (
        <div>No sections</div>
      )}
    </div>
  );
};

export default Sections;
