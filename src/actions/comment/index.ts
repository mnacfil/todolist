"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createComment = async (data: Prisma.CommentCreateInput) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        ...data,
      },
    });
    return {
      status: 201,
      data: comment,
      message: "Success",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong",
    };
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    return {
      status: 200,
      message: "Comment deleted",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
};

export const updateComment = async ({
  commentId,
  data,
}: {
  commentId: string;
  data: Prisma.CommentCreateInput;
}) => {
  try {
    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { ...data },
    });

    return {
      status: 200,
      data: updated,
      message: "Comment updated",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong",
    };
  }
};
