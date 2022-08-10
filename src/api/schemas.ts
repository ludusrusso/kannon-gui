import { z } from "zod";

export const CreateTemplateSchema = z.object({
  domain: z.string(),
  title: z.string(),
  html: z.string(),
});
