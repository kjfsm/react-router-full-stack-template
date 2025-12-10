import { Form, redirect, useLoaderData } from "react-router";
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
  const intent = form.get("intent");

  if (intent === "add") {
    const title = form.get("title") as string;
    await prisma.todo.create({
      data: {
        title,
        userId: session.user.id,
      },
    });
    return null;
  }

  if (intent === "toggle") {
    const id = form.get("id") as string;
    const todo = await prisma.todo.findFirst({
      where: { id, userId: session.user.id },
    });
    if (!todo) return null;

    await prisma.todo.update({
      where: { id },
      data: { done: !todo.done },
    });
    return null;
  }
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col items-start gap-6 p-4">
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 font-semibold text-2xl">タスク</h1>

        <Form method="post" className="mb-4">
          <Input type="hidden" name="intent" value="add" />
          <div className="flex w-full items-center gap-2">
            <Input name="title" placeholder="新しいタスクを追加" />
            <Button type="submit" variant="outline">
              追加
            </Button>
          </div>
        </Form>

        <Card className="w-full p-4">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Form method="post">
                  <Input type="hidden" name="intent" value="toggle" />
                  <Input type="hidden" name="id" value={todo.id} />
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={
                        todo.done ? "text-muted-foreground line-through" : ""
                      }
                    >
                      {todo.title}
                    </div>
                    <Button>{todo.done ? "元に戻す" : "完了"}</Button>
                  </div>
                </Form>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
