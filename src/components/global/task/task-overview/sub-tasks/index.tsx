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

  const totalSubtasks = data?.subTasks?.length ?? 0;
  const totalCompletedSubtasks =
    data?.subTasks?.filter((subtask) => subtask.completed).length ?? 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.subTasks && data.subTasks?.length > 0 ? (
        <HideAndShow
          label="Sub tasks"
          subLabel={`${totalCompletedSubtasks}/${totalSubtasks}`}
        >
          <div className="divide-y flex flex-col">
            {data.subTasks
              .filter((item) => !item.completed)
              .map((subTask) => (
                <div key={subTask.id}>
                  <SubTask
                    userId={userId}
                    taskId={task.id as string}
                    subTask={subTask}
                  />
                </div>
              ))}
            <div className="py-2.5">
              <ToggleAddTask
                userId={userId}
                taskId={task?.id}
                type={"sub-task"}
              />
            </div>
            {data.subTasks
              .filter((item) => item.completed)
              .map((subTask) => (
                <div key={subTask.id}>
                  <SubTask
                    userId={userId}
                    taskId={task.id as string}
                    subTask={subTask}
                  />
                </div>
              ))}
          </div>
          {totalCompletedSubtasks > 0 && <Separator className="mb-2" />}
        </HideAndShow>
      ) : (
        <ToggleAddTask userId={userId} taskId={task?.id} type={"sub-task"} />
      )}
    </div>
  );
};

export default SubTasks;
