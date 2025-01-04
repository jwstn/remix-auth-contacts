import type { Route } from "./+types/index";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  console.log(request, "[request]");

  return {};
}

export default function Index({ loaderData, matches, params, actionData }: Route.ComponentProps) {
  // console.log(loaderData, matches, params, actionData);
  return <div>index</div>;
}
