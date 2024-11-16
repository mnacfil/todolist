import {
  getTaskComments,
  getTasks,
  getTaskSubTasks,
  getTotalTasks,
} from "@/actions/task";
import { queryOptions } from "@tanstack/react-query";
import { appKeys } from "./keys";

export const getTaskOptions = queryOptions({
  queryKey: appKeys.getTasks(),
  queryFn: async () => await getTasks(),
});

export const getTotalTasksOptions = queryOptions({
  queryKey: appKeys.getTotalTasks(),
  queryFn: async () => await getTotalTasks(),
});

export const getTaskSubTasksOptions = (taskId: string) =>
  queryOptions({
    queryKey: appKeys.getTaskSubTasks(taskId),
    queryFn: async () => await getTaskSubTasks(taskId),
  });

export const getTaskCommentsOptions = (taskId: string) =>
  queryOptions({
    queryKey: appKeys.getTaskComments(taskId),
    queryFn: async () => await getTaskComments(taskId),
  });

// get user tasks
