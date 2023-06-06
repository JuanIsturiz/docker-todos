import { publicProcedure, router } from "..";

export const exampleRouter = router({
  test: publicProcedure.query(async () => {
    return "Hello from tRPC!!";
  }),
});
