import { caller } from "@/utils/trpc/server";
import type { Route } from "./+types/home";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const api = await caller(loaderArgs);
  const hello = await api.greeting.hello();
  return { hello };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hello } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      {hello}
    </div>
  );
}
