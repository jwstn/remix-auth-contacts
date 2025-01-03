import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db";
import { contactsTable } from "@/db/schema";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ params }: Route.LoaderArgs) {
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
