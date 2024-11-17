import { createComment, deleteComment, updateComment } from "@/actions/comment";
import { appKeys } from "@/lib/react-query/keys";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useComment = (taskId: string) => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: async (data: Prisma.CommentCreateInput) => {
      return await createComment(data);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskComments(taskId)
      );
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTaskComments(taskId),
        (old: any) => ({
          ...old,
          ["comments"]: [payload, ...old.comments],
        })
      );
      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskComments(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      return await deleteComment(commentId);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskComments(taskId)
      );
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTaskComments(taskId),
        (old: any) => ({
          ...old,
          ["comments"]: old.comments.filter(
            (comment: Prisma.CommentCreateInput) => comment.id === payload
          ),
        })
      );
      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskComments(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      data,
    }: {
      commentId: string;
      data: Prisma.CommentCreateInput;
    }) => {
      return await updateComment({ commentId, data });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
      const previousSubTasks = queryClient.getQueryData(
        appKeys.getTaskComments(taskId)
      );
      queryClient.setQueryData<Prisma.TaskCreateInput[]>(
        appKeys.getTaskComments(taskId),
        (old: any) => ({
          ...old,
          ["comments"]: old.comments.map((comment: Prisma.CommentCreateInput) =>
            comment.id === payload.commentId ? payload.data : comment
          ),
        })
      );
      return { previousSubTasks };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(
        appKeys.getTaskComments(taskId),
        context?.previousSubTasks
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: appKeys.getTaskComments(taskId),
      });
    },
  });

  const commentMutation = {
    create: createCommentMutation,
    delete: deleteCommentMutation,
    update: updateCommentMutation,
  };

  return {
    commentMutation,
  };
};
