"use client";

import Task from "@/components/global/task";
import { getProjectTasksOptions } from "@/lib/react-query/options";
import { useQuery } from "@tanstack/react-query";

type Props = {
  projectId: string;
  userId: string;
};

const Project = ({ projectId, userId }: Props) => {
  const { isPending, data } = useQuery(getProjectTasksOptions(projectId));
  if (isPending) {
    return <p>loading...</p>;
  }

  return (
    <>
      {data?.projectTasks && data?.projectTasks?.length > 0 ? (
        <>
          <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-6">
            {data.projectTasks.map((task) => (
              <Task key={task.id} task={task} userId={userId} />
            ))}
          </div>
        </>
      ) : (
        <div>Empty Tasks</div>
      )}
    </>
  );
};

export default Project;
