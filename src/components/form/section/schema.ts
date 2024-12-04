import { z } from "zod";

export const SectionSchema = z.object({
  name: z.string().min(3).max(100),
});
