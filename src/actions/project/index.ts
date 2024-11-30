"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createProject = async ({
  userId,
  data,
}: {
  userId: string;
  data: Prisma.ProjectCreateInput;
}) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
      },
    });
    return {
      status: 200,
      data: project,
      message: "Project created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      data: null,
      message: "Something went wrong",
    };
  }
};

export const getProjects = async (userId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        author: {
          clerkId: userId,
        },
      },

      orderBy: { createdAt: "desc" },
    });

    return {
      status: 200,
      data: projects,
      message: "Successfully get projects",
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      data: null,
      message: "Something went wrong",
    };
  }
};

export const getProjectTasks = async (projectId: string) => {
  if (!projectId) {
    return {
      status: 400,
      message: "Invalid project",
    };
  }
  try {
    const projectTasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      status: 200,
      projectTasks,
      message: "Successfully get project tasks",
    };
  } catch (error) {
    return {
      status: 400,
      projectTasks: [],
      message: "Something went wrong, Please try again later.",
    };
  }
};
