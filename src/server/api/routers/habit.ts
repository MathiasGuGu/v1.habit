import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { habitDays, habitboards } from "@/server/db/schema";
import { eq } from "drizzle-orm";
// import { posts } from "@/server/db/schema";

export const habitRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const hb = await ctx.db.query.habitboards.findMany();
    return hb ?? null;
  }),

  getHabitdaysForHabitboard: publicProcedure
    .input(z.object({ habitboardId: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const habitDaysForHabitboard = await ctx.db.query.habitDays.findMany({
        where: eq(habitDays.habitboardId, input.habitboardId),
      });
      return habitDaysForHabitboard ?? null;
    }),

  create: publicProcedure
    .input(
      z.object({ title: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(habitboards).values({
        title: input.title,
        description: input.description,
      });
    }),

  createHabitDay: publicProcedure
    .input(
      z.object({
        habitboardId: z.number().min(1),
        day: z.string().min(1),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(habitDays).values({
        habitboardId: input.habitboardId,
        completed: input.completed,
        day: input.day,
      });
    }),

  updateHabitDay: publicProcedure
    .input(
      z.object({
        habitDayId: z.number().min(1),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(habitDays)
        .set({ completed: input.completed })
        .where(eq(habitDays.habitboardId, input.habitDayId));
    }),
  //   create: upblicProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       await ctx.db.insert(posts).values({
  //         name: input.name,
  //       });
  //     }),

  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),
});
