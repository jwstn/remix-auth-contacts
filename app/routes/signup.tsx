import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as zod from "zod";

import { auth } from "@/lib/auth.server";
import { FormProvider, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { GalleryVerticalEnd } from "lucide-react";
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
                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div> */}
                {/* <div className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div> */}
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
