import { router } from ".";
import { todoRouter } from "./routes/todo";

export const appRouter = router({
  todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
