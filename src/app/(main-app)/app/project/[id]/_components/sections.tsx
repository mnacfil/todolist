"use client";

import HideAndShow from "@/components/global/hide-and-show";
import { getProjectSectionsOptions } from "@/lib/react-query/options";
import { useQuery } from "@tanstack/react-query";
import SectionActions from "./section-actions";
import ToggleAddTask from "@/components/global/toggle-add-task";
import Task from "@/components/global/task";
import { useAuth } from "@clerk/nextjs";
import { TaskPlace } from "@/components/form/add-task";
import { useSection } from "@/hooks/section";

type Props = {
  projectId: string;
};

const Sections = ({ projectId }: Props) => {
  const { data, isPending } = useQuery(
    getProjectSectionsOptions(projectId ?? "")
  );
  const { remove } = useSection(projectId);

  const { userId } = useAuth();
  if (!userId) return;

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
                  title={section.title}
                  totalTasks={section?.tasks?.length ?? 0}
                  onArchive={() => {}}
                  onCopyLink={() => {}}
                  onDelete={() => {
                    remove.mutate(section.id);
                  }}
                  onDuplicate={() => {}}
                  onEdit={() => {}}
                  onMove={() => {}}
                  key={`${section.id}-actions`}
                />
              }
            >
              <div className="flex w-full gap-2 flex-col divide-y divide-slate-100">
                {section?.tasks &&
                  section.tasks.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      userId={userId}
                      sectionId={section.id}
                      projectId={projectId}
                      place={TaskPlace.SECTION}
                    />
                  ))}
                <div className="py-3">
                  <ToggleAddTask
                    userId={userId}
                    sectionId={section.id}
                    projectId={projectId}
                    place={TaskPlace.SECTION}
                  />
                </div>
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
