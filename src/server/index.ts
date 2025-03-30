import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getData: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      message: "Data from the server!",
      data: { number: 4, text: "Hello" },
    };
  }),
});

export type AppRouter = typeof appRouter;
