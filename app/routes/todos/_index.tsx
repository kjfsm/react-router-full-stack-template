import { useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
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
import { Input } from "~/lib/generated/shadcn/components/ui/input";
import { z } from "zod";
import { zfd } from "zod-form-data";
import type { Route } from "./+types/_index";

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return { todos };
}

export async function action({ request, context }: Route.ActionArgs) {
  const user = context.get(userContext);

  const form = await request.formData();
  const { title } = zfd
    .formData({
      title: zfd.text(z.string().min(1)),
    })
    .parse(form);
  await prisma.todo.create({
    data: {
      title,
      userId: user.id,
    },
  });
  return null;
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { totalCount, doneCount, remainingCount } = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((todo) => todo.done).length;
    return {
      totalCount: total,
      doneCount: done,
      remainingCount: total - done,
    };
  }, [todos]);

  return (
    <div className="flex flex-col gap-8 py-4">
      <section className="space-y-2">
        <h1 className="font-semibold text-2xl">タスク</h1>
        <p className="text-muted-foreground">
          今日やることを整理して、進捗を見える化しましょう。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>全タスク</CardDescription>
            <CardTitle className="text-3xl">{totalCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>完了</CardDescription>
            <CardTitle className="text-3xl">{doneCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>未完了</CardDescription>
            <CardTitle className="text-3xl">{remainingCount}</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>新しいタスク</CardTitle>
          <CardDescription>
            取り組みたいことを追加して、すぐに実行に移しましょう。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fetcher.Form method="post" className="flex flex-col gap-3 sm:flex-row">
            <Input
              name="title"
              placeholder="例: デザインレビューを終わらせる"
              required
            />
            <Button type="submit" className="sm:min-w-[120px]">
              追加する
            </Button>
          </fetcher.Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>タスク一覧</CardTitle>
          <CardDescription>
            進捗にあわせて完了・編集・削除ができます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todos.length === 0 ? (
            <div className="rounded-lg border border-dashed px-6 py-10 text-center">
              <p className="font-medium">まだタスクがありません</p>
              <p className="mt-2 text-muted-foreground text-sm">
                まずは上のフォームから1件追加してみましょう。
              </p>
            </div>
          ) : (
            <ul className="divide-y">
              {todos.map((todo) => (
                <li key={todo.id} className="py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <fetcher.Form
                          action={`${todo.id}/edit`}
                          method="post"
                          className="flex flex-col gap-2 sm:flex-row sm:items-center"
                        >
                          <Input name="title" defaultValue={todo.title} />
                          <div className="flex gap-2">
                            <Button type="submit">保存</Button>
                            <Button
                              variant="outline"
                              type="button"
                              onClick={() => setEditingId(null)}
                            >
                              キャンセル
                            </Button>
                          </div>
                        </fetcher.Form>
                      ) : (
                        <div className="space-y-1">
                          <p
                            className={
                              todo.done
                                ? "text-muted-foreground line-through"
                                : "font-medium"
                            }
                          >
                            {todo.title}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {todo.done ? "完了済み" : "進行中"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <fetcher.Form method="post" action={`${todo.id}/toggle`}>
                        <Button
                          aria-label={todo.done ? "未完了にする" : "完了にする"}
                          name="done"
                          value={todo.done ? "false" : "true"}
                          variant={todo.done ? "outline" : "default"}
                        >
                          {todo.done ? "元に戻す" : "完了"}
                        </Button>
                      </fetcher.Form>

                      <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                          setEditingId(editingId === todo.id ? null : todo.id)
                        }
                      >
                        編集
                      </Button>

                      <fetcher.Form action={`${todo.id}/delete`} method="post">
                        <Button type="submit" variant="destructive">
                          削除
                        </Button>
                      </fetcher.Form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
