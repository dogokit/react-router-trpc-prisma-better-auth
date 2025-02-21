import { useTRPC } from '@/utils/trpc/react'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const trpc = useTRPC()
  const { data: hello } = useQuery(trpc.greeting.hello.queryOptions())

  return (
    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen'>
      {hello}
    </div>
  )
}
