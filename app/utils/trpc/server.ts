import { createCallerFactory, createTRPCContext } from '@/server/trpc'
import { appRouter } from '@/server/main'
import { type LoaderFunctionArgs } from 'react-router'

const createContext = (opts: { headers: Headers }) => {
  const headers = new Headers(opts.headers)
  headers.set('x-trpc-source', 'server-loader')
  return createTRPCContext({
    headers
  })
}

const createCaller = createCallerFactory(appRouter)
export const caller = async (loaderArgs: LoaderFunctionArgs) =>
  createCaller(await createContext({ headers: loaderArgs.request.headers }))
