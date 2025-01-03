import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/authenticated/layout.tsx", [index("routes/authenticated/index.tsx")]),

  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
] satisfies RouteConfig;
