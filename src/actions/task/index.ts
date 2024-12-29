"use server";

import { prisma } from "@/lib/db";
import { unstableCache } from "@/lib/unstable-cache";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getTasks = async () => {
  try {
    // for now get all task where section id and project id is null/empty
    const tasks = await prisma.task.findMany({
      where: {
        sectionId: null,
        AND: {
          projectId: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      tasks,
      status: 200,
      message: "Successfully get the tasks.",
    };
  } catch (error) {
    return {
      status: 400,
      tasks: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const getTotalTasks = unstableCache(async () => {
  try {
    const total = await prisma.task.count();
    return {
      status: 200,
      total,
    };
  } catch (error) {
    return {
      status: 400,
      total: 0,
    };
  }
});

export const getUserTasks = async (id: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        author: {
          clerkId: id,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: true,
        subTasks: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (tasks && tasks.length > 0) {
      return {
        status: 200,
        data: tasks,
        message: "Successfully get the tasks.",
      };
    }
    return {
      status: 200,
      data: [],
      message: "Empty tasks.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const createSubTask = async (data: Prisma.SubTaskCreateInput) => {
  try {
    const subTask = await prisma.subTask.create({
      data: {
        ...data,
      },
    });
    return {
      status: 201,
      data: subTask,
      message: "Sub task added.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const updateSubTask = async ({
  data,
  subTaskId,
}: {
  subTaskId: string;
  data: Prisma.SubTaskCreateInput;
}) => {
  if (!subTaskId) {
    return {
      status: 400,
      data: null,
      message: "Invalid id or taskId",
    };
  }
  try {
    const subtask = await prisma.subTask.update({
      where: { id: subTaskId },
      data: { ...data },
    });
    return {
      status: 200,
      data: subtask,
      message: "Sub task has been updated.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Sub task cannot be updated at this time.",
    };
  }
};

export const deleteSubTask = async (id: string, taskId: string) => {
  try {
    const subtask = await prisma.subTask.delete({
      where: { id, taskId },
      select: {
        title: true,
      },
    });
    return {
      status: 200,
      data: subtask,
      message: "1 Sub task completed.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 404,
      message: "Sub task cannot delete at this time.",
    };
  }
};

export const createTask = async ({
  data,
}: {
  data: Prisma.TaskCreateInput;
}) => {
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
      },
    });

    if (task) {
      return {
        status: 201,
        data: task,
        message: "Task added on your list.",
      };
    } else {
      return {
        status: 400,
        data: null,
        message: "Task could not be created.",
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const deleteTask = async (id: string) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
      select: {
        title: true,
      },
    });

    return {
      status: 200,
      data: task,
      message: "1 Task completed.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 404,
      message: "Task cannot be removed at this time.",
    };
  }
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: Prisma.TaskCreateInput;
}) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { ...data },
    });
    return {
      status: 200,
      data: updatedTask,
      message: "Task has been updated successfully.",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        data: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      data: null,
      message: "Something went wrong, Please try again later.",
    };
  }
};

export const getCurrentUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: "mnacfil@gmail.com",
    },
  });
  return user;
};

export const getTaskSubTasks = async (taskId: string) => {
  if (!taskId) {
    return {
      status: 400,
      message: "Invalid task id.",
    };
  }
  try {
    const subTasks = await prisma.subTask.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (subTasks && subTasks.length > 0) {
      return {
        status: 200,
        subTasks,
        message: "There are your sub tasks.",
      };
    }
    return {
      status: 404,
      subTasks: [],
      message: "No subtask for this task.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        subTasks: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      subTasks: [],
      message: "Something went wrong.",
    };
  }
};

export const getTaskComments = async (taskId: string) => {
  if (!taskId) {
    return {
      status: 400,
      message: "Invalid task id.",
    };
  }
  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (comments && comments.length > 0) {
      return {
        status: 200,
        comments,
        message: "There are your sub tasks.",
      };
    }
    return {
      status: 404,
      comments: [],
      message: "No comments for this task.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: error.code,
        comments: null,
        message: error.message,
      };
    }
    return {
      status: 400,
      subtcommentsasks: [],
      message: "Something went wrong.",
    };
  }
};

export const toggleCompletedSubtask = async ({
  subTaskId,
  isCompleted,
}: {
  subTaskId: string;
  isCompleted: boolean;
}) => {
  if (!subTaskId) {
    return {
      status: 400,
      data: null,
      message: "Invalid id or taskId",
    };
  }

  try {
    const updatedSubtask = await prisma.subTask.update({
      where: {
        id: subTaskId,
      },
      data: {
        completed: isCompleted,
      },
    });

    return {
      status: 200,
      data: updatedSubtask.completed,
      message: "1 task completed.",
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      message: "Sub task cannot be updated at this time.",
    };
  }
};
