import { z } from "zod";

export const FighterSchema = z.object({
  firstUser: z.string(),
  secondUser: z.string(),
});
