import SuperJSON from 'superjson'

import { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'

import type { AppRouter } from '@/server/main'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  })
}
let browserQueryClient: QueryClient | undefined = undefined
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const links = [
  loggerLink({
    enabled: (op) =>
      process.env.NODE_ENV === 'development' ||
      (op.direction === 'down' && op.result instanceof Error)
  }),
  httpBatchLink({
    transformer: SuperJSON,
    url: getBaseUrl() + '/api/trpc',
    headers() {
      const headers = new Headers()
      headers.set('x-trpc-source', 'react')
      return headers
    }
  })
]

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
