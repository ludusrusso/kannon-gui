import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../src/api/context";
import { appRouter } from "../../../src/api/mod";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
