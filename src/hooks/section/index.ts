import {
  createSection,
  deleteSection,
  getProjectSections,
  updateSection,
} from "@/actions/section";
import { createTask, deleteTask, updateTask } from "@/actions/task";
import { appKeys } from "@/lib/react-query/keys";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSection = (projectId: string) => {
  const queryClient = useQueryClient();

  const createSectionMutation = useMutation({
    mutationFn: async (data: Prisma.SectionCreateInput) => {
      return await createSection(data);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
      const previousSections = queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );

      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: [...(old?.data ?? []), payload],
        })
      );

      return { previousSections };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        context?.previousSections
      );
      console.log({ sectionError: error });
    },
    onSettled: (res) => {
      if (res?.status === 201) {
        toast("Success", {
          description: res?.message || "Section created",
        });
      } else {
        toast("Error", {
          description: res?.message || "Cannot create section at this time.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteSection(id);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });

      const previousSections = queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );

      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: old.data?.filter((section) => section.id !== payload),
        })
      );

      return { previousSections };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        context?.previousSections
      );
    },
    onSettled: (response) => {
      if (response?.status === 200) {
        toast("Success", {
          description: response?.message ?? "Section deleted.",
        });
      } else {
        toast("Error", {
          description:
            response?.message ?? "Section cannot be deleted at this time.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return await updateSection({ name, sectionId: id });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });

      const previousSections = queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );

      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: old.data?.map((section) =>
            section.id !== payload.id
              ? { ...section, title: payload.name }
              : section
          ),
        })
      );

      return { previousSections };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        context?.previousSections
      );
    },
    onSettled: (response) => {
      if (response?.status === 200) {
        toast("Success", {
          description: response?.message ?? "Section deleted.",
        });
      } else {
        toast("Error", {
          description:
            response?.message ?? "Section cannot be deleted at this time.",
        });
      }
      queryClient.invalidateQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  return {
    create: createSectionMutation,
    remove: deleteSectionMutation,
    update: updateSectionMutation,
  };
};

export const useSectionTask = (projectId: string, sectionId: string) => {
  const queryClient = useQueryClient();

  const createSectionTaskMutation = useMutation({
    mutationFn: async ({
      data,
      sectionId,
    }: {
      sectionId: String;
      data: Prisma.TaskCreateInput;
    }) => {
      return await createTask({ data });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
      const previousTask = await queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: old.data!.map((section) => {
            if (section.id === payload.sectionId) {
              return {
                ...section,
                tasks: [...section.tasks, payload.data],
              };
            }
            return section;
          }),
        })
      );
      return { previousTask };
    },
    onError: (error, newTask, context) => {
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
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
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  const deleteSectionTaskMutation = useMutation({
    mutationFn: async ({
      sectionId,
      id,
    }: {
      id: string;
      sectionId: string;
    }) => {
      return await deleteTask(id);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
      const previousTask = queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: old.data!.map((section) => {
            if (section.id === payload.sectionId) {
              return {
                ...section,
                tasks: section.tasks.filter((task) => task.id !== payload.id),
              };
            }
            return section;
          }),
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
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  const updateSectionTaskMutation = useMutation({
    mutationFn: async ({
      data,
      id,
      sectionId,
    }: {
      id: string;
      data: Prisma.TaskCreateInput;
      sectionId: string;
    }) => {
      return await updateTask({ data, id });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getProjectSections(projectId),
      });
      const previousTask = queryClient.getQueryData(
        appKeys.getProjectSections(projectId)
      );
      queryClient.setQueryData(
        appKeys.getProjectSections(projectId),
        (old: Awaited<ReturnType<typeof getProjectSections>>) => ({
          ...old,
          ["data"]: old.data!.map((section) => {
            if (section.id === payload.sectionId) {
              return {
                ...section,
                tasks: section.tasks.map((task) =>
                  task.id === payload.id ? payload.data : task
                ),
              };
            }
            return section;
          }),
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
        queryKey: appKeys.getProjectSections(projectId),
      });
    },
  });

  return {
    createSectionTaskMutation,
    deleteSectionTaskMutation,
    updateSectionTaskMutation,
  };
};
