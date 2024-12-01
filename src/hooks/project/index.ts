import { createProject } from "@/actions/project";
import { createTask, deleteTask } from "@/actions/task";
import { appKeys } from "@/lib/react-query/keys";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProject = (userId: string) => {
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Prisma.ProjectCreateInput;
    }) => {
      await createProject({ data, userId });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
      const previouseProjects = queryClient.getQueryData(
        appKeys.getUserProjects(userId)
      );

      queryClient.setQueryData(appKeys.getUserProjects(userId), (old: any) => ({
        ...old,
        data: [payload.data, ...old.data],
      }));
      console.log(previouseProjects);

      return { previouseProjects };
    },
    onError: () => {},
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
    },
  });

  const projectMutation = {
    create: createProjectMutation,
  };

  return { projectMutation };
};

export const useProjectTask = (projectId: string) => {
  const queryClient = useQueryClient();

  const createProjectTaskMutation = useMutation({
    mutationFn: async (data: Prisma.TaskCreateInput) => {
      return await createTask({ data });
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectTasks(projectId),
      });
      const previousTask = await queryClient.getQueryData<
        Prisma.TaskCreateInput[]
      >(appKeys.getProjectTasks(projectId));
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getProjectTasks(projectId),
        (old: any) => ({
          ...old,
          ["projectTasks"]: [newTask, ...old.projectTasks],
        })
      );
      return { previousTask };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(
        appKeys.getProjectTasks(projectId),
        context?.previousTask
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 201) {
        toast("Success", {
          description: res?.message || "Task completed",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: [appKeys.userProject],
      });
    },
  });

  const deleteProjectTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTask(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectTasks(projectId),
      });
      const previousTask = queryClient.getQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getProjectTasks(projectId)
      );
      console.log(projectId);

      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getProjectTasks(projectId),
        (old: any) => ({
          ...old,
          ["projectTasks"]: old?.projectTasks.filter(
            (task: Prisma.TaskCreateInput) => task.id !== id
          ),
        })
      );
      return { previousTask };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(
        appKeys.getProjectTasks(projectId),
        context?.previousTask
      );
      console.log(error);
    },
    onSettled: (res) => {
      if (res?.status === 200) {
        toast("Success", {
          description: res?.message || "Task completed.",
        });
      } else {
        toast("Error", {
          description: res?.message || "Something went wrong.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: [appKeys.userProject],
      });
    },
  });

  return {
    createProjectTaskMutation,
    deleteProjectTaskMutation,
    // updateProjectTaskMutation
    // deleteProjectTaskMutation
  };
};