export const appKeys = {
  getTasks: () => ["tasks"] as const,
  getUserTasks: (userId: string) =>
    [...appKeys.getTasks(), "user-tasks", userId] as const,
  getTotalTasks: () => [...appKeys.getTasks(), "total"],
  getTaskSubTasks: (taskId: string) => [
    ...appKeys.getTasks(),
    taskId,
    "sub-tasks",
  ],
  getTaskComments: (taskId: string) => [
    ...appKeys.getTasks(),
    taskId,
    "comments",
  ],
};
