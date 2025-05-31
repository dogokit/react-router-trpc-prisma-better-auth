import { caller } from "@/utils/trpc/server";
import type { Route } from "./+types/home";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const api = await caller(loaderArgs);
  return await api.greeting.hello();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
