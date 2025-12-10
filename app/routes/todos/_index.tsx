import { Form, redirect, useLoaderData } from "react-router";
import { auth } from "~/lib/.server/auth";
import { prisma } from "~/lib/.server/prisma";
import { Button } from "~/lib/generated/shadcn/components/ui/button";
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
    <div>
      <h1>Todos</h1>

      <Form method="post">
        <input type="hidden" name="intent" value="add" />
        <input name="title" placeholder="New todo" />
        <Button>Add</Button>
      </Form>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <Form method="post">
              <input type="hidden" name="intent" value="toggle" />
              <input type="hidden" name="id" value={t.id} />
              <Button>{t.done ? "Undo" : "Done"}</Button>
              {t.title}
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
