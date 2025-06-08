import { caller } from "@/utils/trpc/server";
import type { Route } from "./+types/examples";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const api = await caller(loaderArgs);
  return await api.greeting.hello();
}

export default function Examples({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">All Examples</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(loaderData) && loaderData.length > 0 ? (
          loaderData.map((example: { id: string; name: string }) => (
            <div
              key={example.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700"
            >
              <div className="text-xl font-semibold mb-2">{example.name}</div>
              <div className="text-gray-500 text-xs">ID: {example.id}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No examples found.
          </div>
        )}
      </div>
    </div>
  );
}
