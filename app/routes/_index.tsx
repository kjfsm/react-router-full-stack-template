// app/routes/index.tsx
import { Link, redirect } from "react-router";
import { auth } from "~/lib/.server/auth";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "~/lib/generated/shadcn/components/ui/card";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (session?.user) {
    throw redirect("/todos");
  }
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center font-semibold text-2xl">
          TODOアプリ
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">ログイン</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">新規登録</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
