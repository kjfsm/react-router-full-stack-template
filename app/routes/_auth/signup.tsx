// app/routes/login.tsx
import { Form, Link, redirect, useActionData } from "react-router";
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
  const intent = form.get("intent");

  if (intent === "email-signup") {
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

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
    return redirect("/todos");
  }

  if (intent === "google") {
    return auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/",
      },
      asResponse: true,
    });
  }
}

export default function Login() {
  const data = useActionData() as { error?: string };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="w-[300px]">
        <CardHeader className="text-center">新規登録</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form method="post" className="flex flex-col gap-4">
            <Input type="hidden" name="intent" value="email-signup" />
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

            {data?.error && <p>{data.error}</p>}

            <Button type="submit">新規登録</Button>
          </Form>

          <Form method="post" className="flex flex-col gap-4">
            <Input type="hidden" name="intent" value="google" />
            <Button type="submit">Googleログインで新規登録</Button>
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
