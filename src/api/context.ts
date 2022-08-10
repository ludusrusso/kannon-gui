import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getConfigs } from "env-ts-conf";
import { NewKannonClient } from "../services/kannon";

const kannonConfig = getConfigs({
  host: {
    type: "string",
    variableName: "KANNON_API_URL",
  },
  skipTLS: {
    type: "boolean",
    variableName: "KANNON_SKIP_TLS",
  },
});

const kannon = NewKannonClient(kannonConfig);

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  return {
    kannon,
    req,
    res,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
