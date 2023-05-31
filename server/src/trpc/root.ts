import { router } from ".";
import { todoRouter } from "./routes/todo";

export const appRouter = router({
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
