import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { contactsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Trash2Icon } from "lucide-react";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/contact";

export async function loader({ params }: Route.ActionArgs) {
  const contact = await db
    .select()
    .from(contactsTable)
    .where(eq(contactsTable.id, Number.parseInt(params.contactId)));
  return contact[0];
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex w-full max-w-screen-lg">
      <img alt="" src="" className="min-w-96 min-h-96" />
      <div className="space-y-0 px-2">
        <TypographyH1>{loaderData.name}</TypographyH1>
        <TypographyP>{loaderData.email}</TypographyP>
      </div>

      <Form method="post">
        <Button type="submit" variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </Form>
    </div>
  );
}

export async function action({ params }: Route.ActionArgs) {
  await db.delete(contactsTable).where(eq(contactsTable.id, Number.parseInt(params.contactId)));
  return redirect("/");
}
