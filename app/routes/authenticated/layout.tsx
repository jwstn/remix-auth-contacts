import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db";
import { contactsTable } from "@/db/schema";
import { auth } from "@/lib/auth.server";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });

  console.log(session, "[session]");

  if (!session?.user.id) {
    return redirect("/login");
  }

  return await db.select().from(contactsTable);
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider>
      <AppSidebar contacts={loaderData} />
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
