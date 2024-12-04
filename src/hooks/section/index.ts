import { createSection, getProjectSections } from "@/actions/section";
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
          ["data"]: [payload, ...(old?.data ?? [])],
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
