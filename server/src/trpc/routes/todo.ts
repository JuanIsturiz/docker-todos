import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "..";
import { z } from "zod";

export const todoRouter = router({
  findAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.todo.find({
        order: {
          createdAt: "DESC",
        },
      });
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.todo
          .create({
            content: input.content,
          })
          .save();
        return true;
      } catch (err: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.todo.update(
          { id: input.id },
          { completed: !input.completed }
        );
        return true;
      } catch (err: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.todo.delete({ id: input.id });
        if (result.affected === 0) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        return true;
      } catch (err: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  clearAll: publicProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.db.todo.delete({});
      return true;
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
