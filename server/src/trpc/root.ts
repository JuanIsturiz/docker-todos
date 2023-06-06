import { router } from ".";
import { exampleRouter } from "./routes/example";
import { todoRouter } from "./routes/todo";

export const appRouter = router({
  todo: todoRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
