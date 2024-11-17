"use client";

import HideAndShow from "@/components/global/hide-and-show";
import ToggleAddTask from "@/components/global/toggle-add-task";
import { Prisma } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { TaskType } from "../..";
import { useQuery } from "@tanstack/react-query";
import { getTaskSubTasksOptions } from "@/lib/react-query/options";
import SubTask from "./sub-task";

type Props = {
  task: Prisma.TaskCreateInput;
  userId: string;
};

const SubTasks = ({ task, userId }: Props) => {
  const { data, isPending } = useQuery(
    getTaskSubTasksOptions(task?.id as string)
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.subTasks && data.subTasks?.length > 0 ? (
        <HideAndShow
          label="Sub tasks"
          subLabel={`${0}/${data.subTasks.length}`}
        >
          <div className="divide-y flex flex-col">
            {data.subTasks.map((subTask) => (
              <div key={subTask.id}>
                <SubTask
                  userId={userId}
                  taskId={task.id as string}
                  subTask={subTask}
                />
              </div>
            ))}
            <Separator className="mb-2" />
          </div>
          <ToggleAddTask userId={userId} taskId={task?.id} type={"sub-task"} />
        </HideAndShow>
      ) : (
        <ToggleAddTask userId={userId} taskId={task?.id} type={"sub-task"} />
      )}
    </div>
  );
};

export default SubTasks;
