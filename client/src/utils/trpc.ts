import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/trpc/root";
import { inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutputs = inferRouterOutputs<AppRouter>;
