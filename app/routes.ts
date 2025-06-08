import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/api/auth/*", "routes/api/auth.ts"),
  route("/api/trpc/*", "routes/api/trpc.ts"),

  index("routes/home.tsx"),
  route("/user", "routes/user.tsx"),
  route("/register", "routes/register.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/examples", "routes/examples.tsx"),
] satisfies RouteConfig;
