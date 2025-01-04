import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as zod from "zod";

import { authClient } from "@/lib/auth-client";

import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { GalleryVerticalEnd, Github } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/login";

export const loginFormSchema = zod.object({
  email: zod
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  password: zod.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export default function Login() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: loginFormSchema });
    },
    defaultValue: {
      email: "",
      password: "",
    },
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
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor={fields.email.name}>Email</Label>
                    <Input
                      key={fields.email.key}
                      id={fields.email.id}
                      name={fields.email.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    <span className="text-sm text-red-500">{fields.email?.errors}</span>
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
                    <span className="text-sm text-red-500">{fields.password?.errors}</span>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
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
                    onClick={() => authClient.signIn.social({ provider: "discord" })}
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
          {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div> */}
        </div>
      </div>
    </main>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: loginFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const { data, error } = await authClient.signIn.email({
      email: submission.value.email,
      password: submission.value.password,
    });

    if (error) {
      return toast("Error occured!", {
        description: `${error.message}`,
      });
    }

    toast("Login successfull 🚀", {
      description: `You are now logged in as ${data?.user.name}`,
    });

    return redirect("/");
  } catch (error) {
    toast("Error", {
      description: `${error}`,
    });
    return error;
  }
}
