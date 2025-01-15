import { z } from "zod";

export const FilterSchema = z.object({
  regions: z.array(z.string()).refine((value) => value.length > 0, {
    message: "少なくとも1つの地域を選択してください。",
  }),
  forms: z.array(z.string()).refine((value) => value.length > 0, {
    message: "少なくとも1つの形態を選択してください。",
  }),
});
