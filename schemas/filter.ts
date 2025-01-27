import { z } from "zod";

export const FilterSchema = z.object({
  regions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "少なくとも1つの地方を選択してください。",
  }),
  shapes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "少なくとも1つのフォルムを選択してください。",
  }),
  isImplementeds: z.array(z.string()).refine((value) => value.length > 0, {
    message: "少なくとも1つ選択してください。",
  }),
});

export type FilterFormData = z.infer<typeof FilterSchema>;