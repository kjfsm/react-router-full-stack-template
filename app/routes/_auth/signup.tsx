// app/routes/login.tsx
import { Form, Link, redirect, useActionData } from "react-router";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { auth } from "~/lib/.server/auth";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/lib/generated/shadcn/components/ui/card";
import { Input } from "~/lib/generated/shadcn/components/ui/input";
import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  const { name, email, password } = zfd
    .formData({
      name: zfd.text(z.string().min(1)),
      email: zfd.text(z.string().email()),
      password: zfd.text(z.string().min(1)),
    })
    .parse(form);

  const signUpResponse = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    asResponse: true,
  });
  if (!signUpResponse.ok) {
    const errorText = await signUpResponse.text();
    return { error: `Login failed: ${errorText}` };
  }
  return redirect("/todos", { headers: signUpResponse.headers });
}

export default function Login() {
  const data = useActionData() as { error?: string };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center font-semibold text-xl">
          新規登録
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form method="post" className="flex flex-col gap-4">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              defaultValue="Test User"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue="test@example.com"
              required
            />
            <Input
              name="password"
              type="password"
              defaultValue="password1234"
              required
            />

            {data?.error && (
              <p className="text-red-500 text-sm">{data.error}</p>
            )}

            <Button type="submit" className="w-full">
              新規登録
            </Button>
          </Form>

          <Form
            method="post"
            action="/auth/google"
            className="flex flex-col gap-4"
          >
            <Button type="submit" className="w-full" variant="outline">
              Googleで登録
            </Button>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" asChild>
            <Link to="/">戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
