import type { TRPCRouterRecord } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '@/server/trpc'

export const greetingRouter = {
  hello: publicProcedure.query(() => {
    return 'Hello World!'
  }),
  user: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.user?.id
      }
    })

    return user
  })
} satisfies TRPCRouterRecord
