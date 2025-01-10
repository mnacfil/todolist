import { z } from "zod";

// Todo: add more field
export const AddTaskFormSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  // labels: z.string(),
});
