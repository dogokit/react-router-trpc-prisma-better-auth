import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { TRPCReactProvider } from "./utils/trpc/react";

import type { Route } from "./+types/root";
import "@/app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "React Router v7 + tRPC + Better Auth + Prisma" },
    {
      property: "og:title",
      content: "React Router v7 + tRPC + Better Auth + Prisma",
    },
    {
      name: "description",
      content: "Starter for React Router v7 with tRPC, Better Auth & Prisma ",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center gap-4">
          <a
            href={"/"}
            className="font-bold text-lg text-blue-600 dark:text-blue-400"
          >
            Home
          </a>
          <a
            href={"/examples"}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            Examples
          </a>
          <a
            href={"/signin"}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            Login
          </a>
          <a
            href={"/register"}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            Register
          </a>
          <a
            href={"/user"}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            User
          </a>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <TRPCReactProvider>
      <Outlet />
    </TRPCReactProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
