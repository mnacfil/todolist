export const appKeys = {
  userProject: "user-project" as const,
  getTasks: () => ["tasks"] as const,
  getUserTasks: (userId: string) =>
    [...appKeys.getTasks(), "user-tasks", userId] as const,
  getTotalTasks: () => [...appKeys.getTasks(), "total"] as const,
  getTaskSubTasks: (taskId: string) =>
    [...appKeys.getTasks(), taskId, "sub-tasks"] as const,
  getTaskComments: (taskId: string) =>
    [...appKeys.getTasks(), taskId, "comments"] as const,
  getUserProjects: (userId: string) =>
    [appKeys.userProject, userId, "projects"] as const,
  getProjectTasks: (projectId: string) =>
    [appKeys.userProject, projectId, "tasks"] as const,
};
// keys for sections actions
