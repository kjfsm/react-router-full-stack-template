// app/routes/login.tsx
import { data, Form, Link, redirect, useActionData } from "react-router";
import { auth } from "~/lib/.server/auth";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/lib/generated/shadcn/components/ui/card";
import { Input } from "~/lib/generated/shadcn/components/ui/input";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "email") {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (!response.ok) {
      const message = await response.text();
      return data({ error: message }, { status: 400 });
    }
    return redirect("/todos", { headers: response.headers });
  }

  if (intent === "google") {
    const { url } = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/todos",
      },
    });

    if (!url) {
      return data(
        { error: "Google ログインの開始に失敗しました" },
        { status: 500 },
      );
    }

    // Google の認可画面へリダイレクト
    return redirect(url);
  }

  // intent 不正など
  return data({ error: "不正なリクエストです" }, { status: 400 });
}

export default function Login() {
  const data = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent className="space-y-4">
          <Form method="post" className="space-y-2">
            <Input type="hidden" name="intent" value="email" />

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
              ログイン
            </Button>
          </Form>

          <Form method="post">
            <Input type="hidden" name="intent" value="google" />
            <Button type="submit" className="w-full" variant="outline">
              Googleでログイン
            </Button>
          </Form>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost">
            <Link to="/signup">新規登録</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
