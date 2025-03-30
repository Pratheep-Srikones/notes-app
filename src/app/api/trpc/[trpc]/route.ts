import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/index"; //also from /server since index is the main file

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
