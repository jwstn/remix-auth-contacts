import { authClient } from "@/lib/auth-client";
import { redirect } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/logout";

export async function clientAction({ request }: Route.ClientActionArgs) {
  toast("Logging out...");
  await authClient.signOut();
  return redirect("/login");
}
