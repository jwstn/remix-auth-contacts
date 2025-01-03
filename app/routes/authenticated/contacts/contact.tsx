import type { Route } from "./+types/contact";

export async function loader({ params }: Route.ActionArgs) {
  return params;
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  return <div>{JSON.stringify(loaderData, null, 2)}</div>;
}
