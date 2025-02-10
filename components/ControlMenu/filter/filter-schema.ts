import { z } from "zod";

export const FilterSchema = z.object({
  regions: z.array(z.string()),
  shapes: z.array(z.string()),
  isImplemented: z.array(z.string()),
});

export type FilterFormData = z.infer<typeof FilterSchema>;