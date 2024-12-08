import { createSection, getProjectSections } from "@/actions/section";
import { createTask, deleteTask } from "@/actions/task";
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

  return {
    create: createSectionMutation,
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
    mutationFn: async (id: string) => {
      return await deleteTask(id);
    },
    onMutate: async (id) => {
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
          ["data"]: old?.data!.map((section) => {}),
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
    createSectionTaskMutation,
    deleteSectionTaskMutation,
    // updateProjectTaskMutation
    // deleteProjectTaskMutation
  };
};
