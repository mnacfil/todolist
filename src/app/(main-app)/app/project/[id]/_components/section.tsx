"use client";

import { TaskPlace } from "@/components/form/add-task";
import HideAndShow from "@/components/global/hide-and-show";
import Task from "@/components/global/task";
import ToggleAddTask from "@/components/global/toggle-add-task";
import SectionActions from "./section-actions";
import { Section as PrismaSection, Task as PrismaTask } from "@prisma/client";
import { useState } from "react";
import { useSection } from "@/hooks/section";
import SectionForm from "@/components/form/section";

export type SectionWithRelations = PrismaSection & {
  tasks?: PrismaTask[];
};

type Props = {
  data: SectionWithRelations;
  projectId: string;
  userId: string;
};

const Section = ({ data, projectId, userId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { remove } = useSection(projectId);

  return (
    <>
      <HideAndShow
        key={data.id}
        label={data.title}
        subLabel={data?.tasks?.length.toString() ?? "0"}
        hasActions={true}
        isEditing={isEditing}
        EditingForm={
          <SectionForm
            data={data}
            isEditing={isEditing}
            projectId={projectId}
            onCancel={() => setIsEditing(false)}
          />
        }
        Actions={
          <SectionActions
            title={data.title}
            totalTasks={data?.tasks?.length ?? 0}
            onArchive={() => {}}
            onCopyLink={() => {}}
            onDelete={() => {
              remove.mutate(data.id);
            }}
            onDuplicate={() => {}}
            onEdit={() => {
              setIsEditing(true);
            }}
            onMove={() => {}}
            key={`${data.id}-actions`}
          />
        }
      >
        <div className="flex w-full gap-2 flex-col divide-y divide-slate-100">
          {data?.tasks &&
            data.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                userId={userId}
                sectionId={data.id}
                projectId={projectId}
                place={TaskPlace.SECTION}
              />
            ))}
          <div className="py-3">
            <ToggleAddTask
              userId={userId}
              sectionId={data.id}
              projectId={projectId}
              place={TaskPlace.SECTION}
            />
          </div>
        </div>
      </HideAndShow>
    </>
  );
};

export default Section;
