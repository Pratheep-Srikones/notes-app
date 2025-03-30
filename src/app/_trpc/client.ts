import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server/index"; //also from /server since index is the main file

export const trpc = createTRPCReact<AppRouter>({});
