import {
  createProject,
  deleteProject,
  getProjects,
  getProjectTasks,
  toggleFavoriteProject,
  updateProject,
} from "@/actions/project";
import { createTask, deleteTask, updateTask } from "@/actions/task";
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

      return { previouseProjects };
    },
    onError: () => {},
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteProject(id);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
      const previouseProjects = queryClient.getQueryData(
        appKeys.getUserProjects(userId)
      );

      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        (old: Awaited<ReturnType<typeof getProjects>>) => ({
          ...old,
          data: old.data?.filter((project) => project.id !== payload),
        })
      );

      return { previouseProjects };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        context?.previouseProjects
      );
      console.log(error);
    },
    onSettled: (response) => {
      if (response?.status === 200) {
        toast("Success", {
          description: response.message ?? "Deleted project successfully",
        });
      } else {
        toast("Error", {
          description: response?.message ?? "Cannot delete project.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      projectId,
      title,
    }: {
      projectId: string;
      title: string;
    }) => {
      return await updateProject({
        projectId,
        title,
      });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
      const previouseProjects = queryClient.getQueryData(
        appKeys.getUserProjects(userId)
      );

      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        (old: Awaited<ReturnType<typeof getProjects>>) => ({
          ...old,
          data: old.data?.map((project) =>
            project.id === payload.projectId
              ? {
                  ...project,
                  title: payload.title,
                }
              : project
          ),
        })
      );

      return { previouseProjects };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        context?.previouseProjects
      );
      console.log(error);
    },
    onSettled: (response) => {
      if (response?.status === 200) {
        toast("Success", {
          description: response.message ?? "Deleted project successfully",
        });
      } else {
        toast("Error", {
          description: response?.message ?? "Cannot delete project.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
    },
  });

  const toggleFavoriteProjectMutation = useMutation({
    mutationFn: async ({
      projectId,
      isFavorite,
    }: {
      projectId: string;
      isFavorite: boolean;
    }) => {
      return await toggleFavoriteProject({
        projectId,
        isFavorite,
      });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
      const previouseProjects = queryClient.getQueryData(
        appKeys.getUserProjects(userId)
      );

      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        (old: Awaited<ReturnType<typeof getProjects>>) => ({
          ...old,
          data: old.data?.map((project) =>
            project.id === payload.projectId
              ? {
                  ...project,
                  favorite: payload.isFavorite,
                }
              : project
          ),
        })
      );

      return { previouseProjects };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getUserProjects(userId),
        context?.previouseProjects
      );
      console.log(error);
    },
    onSettled: (response) => {
      if (response?.status === 200) {
        toast("Success", {
          description: response.message ?? "Project added to Favorites",
        });
      } else {
        toast("Error", {
          description: response?.message ?? "Cannot delete project.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getUserProjects(userId),
      });
    },
  });

  const projectMutation = {
    create: createProjectMutation,
    remove: deleteProjectMutation,
    update: updateProjectMutation,
    toggleFavorite: toggleFavoriteProjectMutation,
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
      const previousTask = queryClient.getQueryData(
        appKeys.getProjectTasks(projectId)
      );
      console.log(projectId);

      queryClient.setQueryData(
        appKeys.getProjectTasks(projectId),
        (old: Awaited<ReturnType<typeof getProjectTasks>>) => ({
          ...old,
          ["projectTasks"]: old?.projectTasks?.filter((task) => task.id !== id),
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

  const updateProjectTaskMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Prisma.TaskCreateInput;
    }) => {
      return await updateTask({ data, id });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectTasks(projectId),
      });
      const previousTask = queryClient.getQueryData(
        appKeys.getProjectTasks(projectId)
      );

      queryClient.setQueryData(
        appKeys.getProjectTasks(projectId),
        (old: Awaited<ReturnType<typeof getProjectTasks>>) => ({
          ...old,
          ["projectTasks"]: old?.projectTasks?.map((task) =>
            task.id === payload.id ? payload.data : task
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
    updateProjectTaskMutation,
  };
};
