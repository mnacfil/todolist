import { createProject } from "@/actions/project";
import { appKeys } from "@/lib/react-query/keys";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
