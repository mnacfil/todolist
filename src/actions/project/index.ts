"use server";

import { prisma } from "@/lib/db";

export const createProject = async ({
  userId,
  data,
}: {
  userId: string;
  data: { title: string; color: string };
}) => {
  try {
    const project = await prisma.user.update({
      where: { id: userId },
      data: {
        Project: {
          create: {
            ...data,
          },
        },
      },
    });
    return {
      status: 200,
      data: project,
      message: "Project created successfully",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong",
    };
  }
};
