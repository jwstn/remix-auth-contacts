import { auth } from "@/lib/auth.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("get handler");
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action handler");
  return auth.handler(request);
}
