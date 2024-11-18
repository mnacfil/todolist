import { z } from "zod";

export const AddProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters." })
    .max(120, { message: "Name should not exceed 120 characters." }),
  color: z.string().optional(),
});
