import {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  updateSubTask,
  updateTask,
} from "@/actions/task";
import { appKeys } from "@/lib/react-query/keys";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTask = (userId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: Prisma.TaskCreateInput) => {
      return await createTask({ data });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getTasks(),
      });
      const previousTask = await queryClient.getQueryData<
        Prisma.TaskCreateInput[]
      >(appKeys.getTasks());
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTasks(),
        (old: any) => ({ ...old, ["tasks"]: [newTask, ...old.tasks] })
      );
      return { previousTask };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(appKeys.getTasks(), context?.previousTask);
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 201) {
        toast("Success", {
          description: res?.message || "Succesfully added on your list.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({ queryKey: appKeys.getTasks() });
    },
  });

  const { isPending: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTask(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getTasks(),
      });

      const previousTask = queryClient.getQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTasks()
      );

      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTasks(),
        (old: any) => ({
          ...old,
          ["tasks"]: old.tasks.filter(
            (task: Prisma.TaskCreateInput) => task.id !== id
          ),
        })
      );
      return { previousTask };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(appKeys.getTasks(), context?.previousTask);
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Task deleted.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: [...appKeys.getTasks(), appKeys.getTotalTasks()],
      });
    },
  });

  const { isPending: isUpdating, mutate: updateMutate } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Prisma.TaskCreateInput;
    }) => {
      return await updateTask({ id, data });
    },
    onMutate: ({ id, data }) => {
      queryClient.cancelQueries({ queryKey: appKeys.getTasks() });

      const previousTasks = queryClient.getQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTasks()
      );

      queryClient.setQueryData(appKeys.getTasks(), (old: any) => ({
        ...old,
        ["tasks"]: old.tasks.map((task: Prisma.TaskCreateInput) =>
          task.id === id ? data : task
        ),
      }));

      return { previousTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(appKeys.getTasks(), context?.previousTasks);
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Task has been updated succesfully.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({ queryKey: appKeys.getTasks() });
    },
  });

  return {
    isPending,
    isDeleting,
    isUpdating,
    mutate,
    deleteMutate,
    updateMutate,
  };
};

export const useSubTask = (taskId: string) => {
  const queryClient = useQueryClient();
  const createSubTaskMutationResult = useMutation({
    mutationFn: async (data: Prisma.SubTaskCreateInput) => {
      return await createSubTask(data);
    },
    onMutate: (payload) => {
      queryClient.cancelQueries({ queryKey: appKeys.getTaskSubTasks(taskId) });
      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskSubTasks(taskId)
      );
      queryClient.setQueryData(appKeys.getTaskSubTasks(taskId), (old: any) => ({
        ...old,
        ["subTasks"]: [payload, ...old.subTasks],
      }));

      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskSubTasks(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 201) {
        toast("Success", {
          description: res?.message || "Sub task add succesfully.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskSubTasks(taskId),
      });
    },
  });

  const deleteSubtaskMutationResult = useMutation({
    mutationFn: async ({
      subTaskId,
      taskId,
    }: {
      subTaskId: string;
      taskId: string;
    }) => {
      return await deleteSubTask(subTaskId, taskId);
    },
    onMutate: (payload) => {
      queryClient.cancelQueries({ queryKey: appKeys.getTaskSubTasks(taskId) });

      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskSubTasks(taskId)
      );
      queryClient.setQueryData(appKeys.getTaskSubTasks(taskId), (old: any) => ({
        ...old,
        ["subTasks"]: old?.subTasks?.filter(
          (subTask: Prisma.SubTaskCreateInput) =>
            subTask.id !== payload.subTaskId
        ),
      }));

      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskSubTasks(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "1 Sub task completed",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskSubTasks(taskId),
      });
    },
  });

  const updateSubtaskMutationResult = useMutation({
    mutationFn: async ({
      subTaskId,
      data,
    }: {
      subTaskId: string;
      data: Prisma.SubTaskCreateInput;
    }) => {
      return await updateSubTask({ subTaskId, data });
    },
    onMutate: (payload) => {
      queryClient.cancelQueries({ queryKey: appKeys.getTaskSubTasks(taskId) });

      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskSubTasks(taskId)
      );

      console.log(previousSubTasks);

      queryClient.setQueryData(appKeys.getTaskSubTasks(taskId), (old: any) => ({
        ...old,
        ["subTasks"]: old.subTasks.map((subTask: Prisma.SubTaskCreateInput) =>
          subTask.id === payload.subTaskId ? payload.data : subTask
        ),
      }));

      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskSubTasks(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Sub task successfully updated.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskSubTasks(taskId),
      });
    },
  });

  const subTaskMutation = {
    create: {
      mutate: createSubTaskMutationResult.mutate,
      isPending: createSubTaskMutationResult.isPending,
    },
    delete: {
      mutate: deleteSubtaskMutationResult.mutate,
      isPending: deleteSubtaskMutationResult.isPending,
    },
    update: {
      mutate: updateSubtaskMutationResult.mutate,
      isPending: updateSubtaskMutationResult.isPending,
    },
  };

  return {
    subTaskMutation,
  };
};
