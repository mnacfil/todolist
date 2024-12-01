"use client";

import Task from "@/components/global/task";
import ToggleAddTask from "@/components/global/toggle-add-task";
import { getProjectTasksOptions } from "@/lib/react-query/options";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Props = {
  projectId: string;
};

const Project = ({ projectId }: Props) => {
  const { userId } = useAuth();
  const { isPending, data } = useQuery(getProjectTasksOptions(projectId));
  if (isPending) {
    return <p>loading...</p>;
  }
  if (!userId) {
    return null;
  }

  return (
    <>
      {data?.projectTasks && data?.projectTasks?.length > 0 ? (
        <>
          <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-6">
            {data.projectTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                userId={userId}
                projectId={projectId}
              />
            ))}
          </div>
          <ToggleAddTask userId={userId} projectId={projectId} />
        </>
      ) : (
        <div>
          <ToggleAddTask userId={userId} projectId={projectId} />
          <div className="flex items-center justify-center flex-col min-h-60">
            <h2 className="text-md">Your peace of mind is priceless</h2>
            <p className="text-gray-600 text-sm">
              Well done! All your tasks are organized in the right place.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
