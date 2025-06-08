import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "@/server/trpc";
import { db } from "../db";

export const greetingRouter = {
  hello: publicProcedure.query(async (ctx) => {
    return await db.example.findMany({
      cacheStrategy: { ttl: 60 },
    });
  }),

  user: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.user?.id,
      },
    });

    return user;
  }),
} satisfies TRPCRouterRecord;
