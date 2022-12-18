import { z } from "zod";

export const TemplateSchema = z.object({
  domain: z.string(),
  title: z.string(),
  html: z.string(),
});
