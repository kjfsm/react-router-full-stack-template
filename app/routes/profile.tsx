import { Link, redirect, useLoaderData } from "react-router";
import { auth } from "~/lib/.server/auth";
import { userContext } from "~/lib/.server/context";
import { prisma } from "~/lib/.server/prisma";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/lib/generated/shadcn/components/ui/card";
import type { Route } from "./+types/profile";

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    const session = await auth.api.getSession({ headers: request.headers });
    const user = session?.user;

    if (!user) {
      throw redirect("/login");
    }

    const normalizedUser = {
      ...user,
      image: user.image ?? null,
    };

    context.set(userContext, normalizedUser);

    return next();
  },
];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  const [totalTodos, completedTodos] = await Promise.all([
    prisma.todo.count({ where: { userId: user.id } }),
    prisma.todo.count({ where: { userId: user.id, done: true } }),
  ]);

  return { user, totalTodos, completedTodos };
}

export default function Profile() {
  const { user, totalTodos, completedTodos } =
    useLoaderData<typeof loader>();
  const createdAt = user.createdAt ? new Date(user.createdAt) : null;
  const updatedAt = user.updatedAt ? new Date(user.updatedAt) : null;
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-8 py-4">
      <section className="space-y-2">
        <h1 className="font-semibold text-2xl">プロフィール</h1>
        <p className="text-muted-foreground">
          アカウント情報とタスクの概要を確認できます。
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
            <CardDescription>登録内容の概要です。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary text-xl font-semibold">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border px-4 py-3">
                <p className="text-muted-foreground text-xs">ユーザーID</p>
                <p className="mt-1 break-all text-sm font-medium">{user.id}</p>
              </div>
              <div className="rounded-lg border px-4 py-3">
                <p className="text-muted-foreground text-xs">メール認証</p>
                <p className="mt-1 text-sm font-medium">
                  {user.emailVerified ? "認証済み" : "未認証"}
                </p>
              </div>
              <div className="rounded-lg border px-4 py-3">
                <p className="text-muted-foreground text-xs">登録日</p>
                <p className="mt-1 text-sm font-medium">
                  {createdAt
                    ? createdAt.toLocaleDateString("ja-JP")
                    : "-"}
                </p>
              </div>
              <div className="rounded-lg border px-4 py-3">
                <p className="text-muted-foreground text-xs">最終更新</p>
                <p className="mt-1 text-sm font-medium">
                  {updatedAt
                    ? updatedAt.toLocaleDateString("ja-JP")
                    : "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>タスク概要</CardTitle>
            <CardDescription>現在の進捗をまとめています。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">合計</span>
                <span className="font-semibold">{totalTodos} 件</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">完了</span>
                <span className="font-semibold">{completedTodos} 件</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">未完了</span>
                <span className="font-semibold">
                  {totalTodos - completedTodos} 件
                </span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link to="/todos">タスク一覧へ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
