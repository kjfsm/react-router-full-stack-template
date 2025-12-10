import { useState } from "react";
import { redirect, useFetcher, useLoaderData } from "react-router";
import { auth } from "~/lib/.server/auth";
import { prisma } from "~/lib/.server/prisma";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
import { Card } from "~/lib/generated/shadcn/components/ui/card";
import { Input } from "~/lib/generated/shadcn/components/ui/input";
import type { Route } from "./+types/_index";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    throw redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return { todos, session };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    throw redirect("/login");
  }

  const form = await request.formData();
  const title = form.get("title") as string;
  await prisma.todo.create({
    data: {
      title,
      userId: session.user.id,
    },
  });
  return null;
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 p-4">
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 font-semibold text-2xl">タスク</h1>

        <fetcher.Form method="post" className="mb-4">
          <div className="flex w-full items-center gap-2">
            <Input name="title" placeholder="新しいタスクを追加" />
            <Button type="submit" variant="outline">
              追加
            </Button>
          </div>
        </fetcher.Form>

        <Card className="w-full p-4">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="py-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <fetcher.Form
                        action={`${todo.id}/edit`}
                        method="post"
                        className="flex items-center gap-2"
                      >
                        <Input name="title" defaultValue={todo.title} />
                        <Button type="submit" className="ml-2">
                          保存
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          キャンセル
                        </Button>
                      </fetcher.Form>
                    ) : (
                      <div
                        className={
                          todo.done ? "text-muted-foreground line-through" : ""
                        }
                      >
                        {todo.title}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <fetcher.Form action={`${todo.id}/toggle`} method="post">
                      <Button>{todo.done ? "元に戻す" : "完了"}</Button>
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
        </Card>
      </div>
    </div>
  );
}
