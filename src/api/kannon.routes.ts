import { z } from "zod";
import { createRouter } from "./router";
import { CreateTemplateSchema } from "./schemas";

export const kubeRoutes = createRouter()
  .query("getDomain", {
    input: z.object({
      domain: z.string(),
    }),
    async resolve({ ctx, input }) {
      const res = await ctx.kannon.getDomains({});
      return res.domains.find((d) => d.domain === input.domain);
    },
  })
  .query("getDomainTemplates", {
    input: z.object({
      domain: z.string(),
      skip: z.number(),
      take: z.number(),
    }),
    async resolve({ ctx, input }) {
      const res = await ctx.kannon.getTemplates({
        domain: input.domain,
        skip: input.skip,
        take: input.take,
      });
      return res;
    },
  })
  .query("getDomainTemplate", {
    input: z.object({
      templateId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const res = await ctx.kannon.getTemplate({
        templateId: input.templateId,
      });
      return res;
    },
  })
  .mutation("createDomainTemplate", {
    input: CreateTemplateSchema,
    async resolve({ ctx, input }) {
      const res = await ctx.kannon.createTemplate({
        domain: input.domain,
        title: input.title,
        html: input.html,
      });
      return res;
    },
  })
  .query("getDomains", {
    async resolve({ ctx }) {
      const res = await ctx.kannon.getDomains({});
      return res;
    },
  })
  .mutation("createDomain", {
    input: z.object({
      domain: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.kannon.createDomain({ domain: input.domain });
    },
  })
  .query("domainStats", {
    input: z.object({
      domain: z.string(),
      skip: z.number().int(),
      take: z.number().int(),
      fromDate: z.date(),
      toDate: z.date(),
    }),

    async resolve({ ctx, input }) {
      return ctx.kannonStats.getStats({
        ...input,
      });
    },
  });
