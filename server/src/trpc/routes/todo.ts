import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "..";

export const todoRouter = router({
  findAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.todo.find();
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
