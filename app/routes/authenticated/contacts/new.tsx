import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { contactsTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, Link, redirect, useNavigation } from "react-router";
import { toast } from "sonner";
import * as zod from "zod";
import type { Route } from "./+types/new";

export const createContactFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "contact must be at least 2 characters.",
  }),
  email: zod
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  description: zod.string().optional(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createContactFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const contact = await db.insert(contactsTable).values(submission.value).returning();
  toast.success("Contact created Successfully!");

  return redirect(`/contacts/${contact[0].id}`);
}

export default function ContactsNew({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const [form, fields] = useForm({
    lastResult: navigation.state === "idle" ? actionData : null,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: createContactFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Form id={form.id} method="post" onSubmit={form.onSubmit} className="max-w-screen-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name-input">Name</Label>
        <Input
          type="text"
          placeholder="the name of your contact"
          id="name-input"
          key={fields.name.key}
          name={fields.name.name}
        />
        <span className="text-red-500">{fields.name.errors}</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name-input">E-Mail</Label>
        <Input
          type="email"
          placeholder="E-Mail"
          id="email-input"
          key={fields.email.key}
          name={fields.email.name}
        />
        <span className="text-red-500">{fields.email.errors}</span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name-input">Description</Label>
        <Textarea
          placeholder="Descripte your contact"
          id="description-input"
          key={fields.description.key}
          name={fields.description.name}
        />
        <span className="text-red-500">{fields.description.errors}</span>
      </div>
      <div className="flex space-x-2">
        <Button type="submit">Submit</Button>
        <Link to="/" className={cn(buttonVariants({ variant: "destructive" }))}>
          Cancel
        </Link>
      </div>
    </Form>
  );
}
