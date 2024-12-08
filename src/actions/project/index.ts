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
      include: {
        _count: {
          select: {
            tasks: true,
          },
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

export const deleteProject = async (projectId: string) => {
  if (!projectId) {
    return {
      status: 400,
      message: "No project id provided",
      data: null,
    };
  }
  try {
    const deleted = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return {
      status: 200,
      data: deleted,
      message: "Project deleted.",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Something went wrong, Please try again later.",
      data: null,
    };
  }
};

export const updateProject = async ({
  projectId,
  title,
}: {
  projectId: string;
  title: string;
}) => {
  if (!projectId) {
    return {
      status: 400,
      message: "No project id provided",
      data: null,
    };
  }
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title,
      },
    });

    return {
      status: 200,
      message: "Project title updated.",
      data: updatedProject,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Something went wrong, Please try again later.",
      data: null,
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
