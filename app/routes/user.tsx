import { caller } from "@/utils/trpc/server";
import { redirect } from "react-router";
import type { Route } from "./+types/user";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const api = await caller(loaderArgs);
  try {
    const user = await api.greeting.user();
    if (!user) return redirect("/");
    return user;
  } catch (error) {
    return redirect("/");
  }
}

export default function Home({ loaderData: user }: Route.ComponentProps) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-gray-500">No user data found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || user.email || "User avatar"}
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl text-gray-500 mb-2">
              {user.name?.[0] || user.email?.[0] || "?"}
            </div>
          )}
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {user.name || "No Name"}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {user.email}
          </div>
        </div>
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-2 flex justify-between">
            <dt className="font-medium text-gray-700 dark:text-gray-300">ID</dt>
            <dd className="text-gray-900 dark:text-gray-100">{user.id}</dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="font-medium text-gray-700 dark:text-gray-300">
              Email Verified
            </dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {user.emailVerified ? "Yes" : "No"}
            </dd>
          </div>
          {user.role && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Role
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">{user.role}</dd>
            </div>
          )}
          {user.banned !== undefined && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Banned
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {user.banned ? "Yes" : "No"}
              </dd>
            </div>
          )}
          {user.banReason && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Ban Reason
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {user.banReason}
              </dd>
            </div>
          )}
          {user.banExpires && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Ban Expires
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {new Date(user.banExpires).toLocaleString()}
              </dd>
            </div>
          )}
          {user.firstName && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                First Name
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {user.firstName}
              </dd>
            </div>
          )}
          {user.lastName && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {user.lastName}
              </dd>
            </div>
          )}
          {user.phone && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Phone
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">{user.phone}</dd>
            </div>
          )}
          {user.createdAt && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Created At
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {new Date(user.createdAt).toLocaleString()}
              </dd>
            </div>
          )}
          {user.updatedAt && (
            <div className="py-2 flex justify-between">
              <dt className="font-medium text-gray-700 dark:text-gray-300">
                Updated At
              </dt>
              <dd className="text-gray-900 dark:text-gray-100">
                {new Date(user.updatedAt).toLocaleString()}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
