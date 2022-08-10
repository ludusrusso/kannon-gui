import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "../src/api/mod";
import "../styles/globals.css";
import superjson from "superjson";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "/api/trpc";

    return {
      transformer: superjson,
      url,
    };
  },
  ssr: false,
})(MyApp);
