import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/authenticated/layout.tsx", [
    index("routes/authenticated/index.tsx"),
    route("contacts/new", "routes/authenticated/contacts/new.tsx"),
    route("contacts/:contactId", "routes/authenticated/contacts/contact.tsx"),
    route("logout", "routes/authenticated/logout.tsx"),
    route("about", "routes/about.tsx"),
  ]),

  route("login", "routes/login.tsx"),
  route("sign-up", "routes/signup.tsx"),
  route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig;
