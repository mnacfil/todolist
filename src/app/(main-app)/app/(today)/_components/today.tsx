"use client";

import { getTasks, getUserTasks } from "@/actions/task";
import Task from "@/components/global/task";
import ToggleAddTask from "@/components/global/toggle-add-task";
import { appKeys } from "@/lib/react-query/keys";
import {
  getTaskOptions,
  getTotalTasksOptions,
} from "@/lib/react-query/options";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

// Todo loading UI

const Today = (props: Props) => {
  const { data, isPending, isError, error } = useQuery(getTaskOptions);

  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) {
    router.push("/login");
    return;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <>
      {data?.tasks && data.tasks.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <CircleCheckBigIcon size={16} className="text-gray-500" />
            <p className="text-gray-500 text-sm">{data.tasks.length} tasks</p>
          </div>
          <div className="flex w-full gap-4 flex-col divide-y divide-slate-100 mt-6">
            {data?.tasks &&
              data.tasks.map((task) => (
                <Task key={task.id} task={task} userId={userId} />
              ))}
          </div>
        </>
      ) : null}
      <ToggleAddTask userId={userId} />
      {data.tasks && data.tasks.length === 0 ? (
        <div className="flex items-center justify-center flex-col min-h-60">
          <h2 className="text-md">Your peace of mind is priceless</h2>
          <p className="text-gray-600 text-sm">
            Well done! All your tasks are organized in the right place.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Today;
