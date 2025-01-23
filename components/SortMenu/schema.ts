import { z } from "zod";

export const SortSchema = z.object({
    sort: z.enum(["index", "name", "implemented_date"]),
    order: z.enum(["asc", "desc"]),
  });