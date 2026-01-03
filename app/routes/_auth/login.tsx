// app/routes/login.tsx
import { Form, Link, useActionData } from "react-router";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/lib/generated/shadcn/components/ui/card";
import { Input } from "~/lib/generated/shadcn/components/ui/input";

export default function Login() {
  const data = useActionData<typeof import("../auth/email").action>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>ログイン</CardHeader>
        <CardContent className="space-y-4">
          <Form method="post" action="/auth/email" className="space-y-2">
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

          <Form method="post" action="/auth/google">
            <Button type="submit" className="w-full" variant="outline">
              Googleでログイン
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
