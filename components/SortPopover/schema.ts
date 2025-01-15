import { z } from "zod";

export const SortSchema = z.object({
    sortBy: z.string(),
    order: z.enum(["asc", "desc"]),
  });