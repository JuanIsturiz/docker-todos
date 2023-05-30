import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "..";
export const todoRouter = router({
  findAll: publicProcedure.query(async ({ ctx }) => {
    // try {
    //   const todos = await ctx.db.todo.find();
    //   return todos;
    // } catch (err: any) {
    //   throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    // }
  }),
});
