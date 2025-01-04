import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db";
import { contactsTable } from "@/db/schema";
import { auth } from "@/lib/auth.server";
import { eq, like } from "drizzle-orm";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });

  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!session?.user.id) {
    return redirect("/login");
  }

  if (query) {
    return {
      contacts: await db
        .select()
        .from(contactsTable)
        .where(like(contactsTable.name, `%${query}%`)),
      user: session.user,
    };
  }

  return {
    contacts: await db.select().from(contactsTable),
    user: session.user,
    query,
  };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider>
      <AppSidebar contacts={loaderData.contacts} user={loaderData.user} query={loaderData.query} />
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
