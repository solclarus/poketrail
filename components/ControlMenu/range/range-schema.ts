import { z } from "zod";

export const RangeSchema = z.object({
    index: z.object({
        min: z.number().min(1).optional(),
        max: z.number().min(1).optional(),
      }),
    date: z.object({
        start: z.date().optional(),
        end: z.date().optional(),
      }),
});

export type RangeFormData = z.infer<typeof RangeSchema>;