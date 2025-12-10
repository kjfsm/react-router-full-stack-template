// app/routes/login.tsx
import { Form, redirect, useActionData } from "react-router";
import { authClient } from "~/lib/.client/auth-client";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "~/lib/generated/shadcn/components/ui/card";
import { Input } from "~/lib/generated/shadcn/components/ui/input";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "email-login") {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const res = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (res.error) return { error: res.error.message };
    return redirect("/");
  }

  if (intent === "google") {
    return authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
}

export default function Login() {
  const data = useActionData() as { error?: string };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Form method="post">
            <Input type="hidden" name="intent" value="email-login" />

            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" required />

            {data?.error && <p>{data.error}</p>}

            <Button>Sign in</Button>
          </Form>

          <Form method="post">
            <Input type="hidden" name="intent" value="google" />
            <Button>Sign in with Google</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
