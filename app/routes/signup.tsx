import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as zod from "zod";

import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth.server";
import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { GalleryVerticalEnd, Github } from "lucide-react";
import { Link, redirect } from "react-router";
import { Form } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/signup";

export const signUpFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: zod
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  password: zod.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signUpFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await auth.api.signUpEmail({
    body: {
      email: submission.value.email,
      password: submission.value.password,
      name: submission.value.name,
    },
  });
  toast("Account successfully created 🚀");
  return redirect("/");
}

export default function SignUp() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: signUpFormSchema });
    },
    defaultValue: {
      name: "",
      email: "",
      password: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <main className="flex min-h-dvh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FormProvider context={form.context}>
            <Form id={form.id} method="post" onSubmit={form.onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="https://www.fondof.de"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Acme Inc.</span>
                  </a>
                  <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor={fields.name.name}>Name</Label>
                    <Input
                      id={fields.name.id}
                      key={fields.name.key}
                      name={fields.name.name}
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                    <span className="text-sm text-red-500">{fields.name.errors}</span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={fields.email.name}>Email</Label>
                    <Input
                      id={fields.email.id}
                      key={fields.email.key}
                      name={fields.email.name}
                      type="email"
                      placeholder="foo@bar.baz"
                      required
                    />
                    <span className="text-sm text-red-500">{fields.email.errors}</span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={fields.password.name}>Password</Label>
                    <Input
                      key={fields.password.key}
                      id={fields.password.id}
                      name={fields.password.name}
                      type="password"
                      placeholder="*********"
                      required
                    />
                    <span className="text-sm text-red-500">{fields.password.errors}</span>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign-Up
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Button
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      authClient.signIn.social({ provider: "discord" });
                    }}
                  >
                    Continue with Discord
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      authClient.signIn.social({ provider: "github" });
                    }}
                  >
                    <Github />
                    Continue with Github
                  </Button>
                </div>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
