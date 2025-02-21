import type { Route } from './+types/user'
import { caller } from '@/utils/trpc/server'
import { redirect } from 'react-router'

export async function loader(loaderArgs: Route.LoaderArgs) {
  const api = await caller(loaderArgs)
  try {
    const user = await api.greeting.user()
    if (!user) {
      return redirect('/')
    }
    return user
  } catch (error) {
    return redirect('/')
  }
}

export default function Home({ loaderData: user }: Route.ComponentProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
      Hello! {user?.name}
    </div>
  )
}
