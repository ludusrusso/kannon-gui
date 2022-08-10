import * as trpc from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";
import { kubeRoutes } from "./kannon.routes";

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("kube.", kubeRoutes);

export type AppRouter = typeof appRouter;
