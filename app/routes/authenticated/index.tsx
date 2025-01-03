import type { Route } from "./+types/index";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ request, context, params }: Route.LoaderArgs) {
  // console.log(request, context, params);
  return {};
}

export default function Index({ loaderData, matches, params, actionData }: Route.ComponentProps) {
  // console.log(loaderData, matches, params, actionData);
  return <div>index</div>;
}
