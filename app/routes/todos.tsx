import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Plus, Trash2 } from "lucide-react";

import { Navbar } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { authenticator } from "~/lib/auth.server";
import { prisma } from "~/lib/db.server";
import type { Todo, User } from "~/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  // TODO: Enable when Prisma client is generated
  // const todos = await prisma.todo.findMany({
  //   where: { userId: user.id },
  //   orderBy: { createdAt: "desc" },
  // });

  const todos: Todo[] = []; // Mock empty array for now

  return json({ user, todos } as { user: User; todos: Todo[] });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "create": {
      const title = formData.get("title");
      const description = formData.get("description");

      if (typeof title !== "string" || title.trim() === "") {
        return json({ error: "Title is required" }, { status: 400 });
      }

      // TODO: Enable when Prisma client is generated
      // await prisma.todo.create({
      //   data: {
      //     title: title.trim(),
      //     description:
      //       typeof description === "string" ? description.trim() : null,
      //     userId: user.id,
      //   },
      // });

      return json({ success: true });
    }

    case "toggle": {
      const id = formData.get("id");
      const completed = formData.get("completed") === "true";

      if (typeof id !== "string") {
        return json({ error: "Invalid todo ID" }, { status: 400 });
      }

      // TODO: Enable when Prisma client is generated
      // await prisma.todo.update({
      //   where: { id, userId: user.id },
      //   data: { completed: !completed },
      // });

      return json({ success: true });
    }

    case "delete": {
      const id = formData.get("id");

      if (typeof id !== "string") {
        return json({ error: "Invalid todo ID" }, { status: 400 });
      }

      // TODO: Enable when Prisma client is generated
      // await prisma.todo.delete({
      //   where: { id, userId: user.id },
      // });

      return json({ success: true });
    }

    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }
};

export default function Todos() {
  const { user, todos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Todos</h1>
          <p className="text-gray-600">
            {totalCount === 0
              ? "No todos yet. Create your first one below!"
              : `${completedCount} of ${totalCount} completed`}
          </p>
        </div>

        {/* Add new todo form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Todo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <fetcher.Form method="post" className="space-y-4">
              <input type="hidden" name="_action" value="create" />
              <div>
                <Input
                  name="title"
                  placeholder="What needs to be done?"
                  required
                  disabled={fetcher.state === "submitting"}
                />
              </div>
              <div>
                <Input
                  name="description"
                  placeholder="Description (optional)"
                  disabled={fetcher.state === "submitting"}
                />
              </div>
              <Button
                type="submit"
                disabled={fetcher.state === "submitting"}
                className="w-full sm:w-auto"
              >
                {fetcher.state === "submitting" ? "Adding..." : "Add Todo"}
              </Button>
            </fetcher.Form>
          </CardContent>
        </Card>

        {/* Todo list */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">
                  No todos yet. Add one above to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            todos.map((todo) => (
              <Card
                key={todo.id}
                className={todo.completed ? "opacity-75" : ""}
              >
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <fetcher.Form method="post">
                      <input type="hidden" name="_action" value="toggle" />
                      <input type="hidden" name="id" value={todo.id} />
                      <input
                        type="hidden"
                        name="completed"
                        value={String(todo.completed)}
                      />
                      <Checkbox
                        checked={todo.completed}
                        onChange={() =>
                          fetcher.submit(
                            {
                              _action: "toggle",
                              id: todo.id,
                              completed: String(todo.completed),
                            },
                            { method: "post" }
                          )
                        }
                        className="mt-1"
                      />
                    </fetcher.Form>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p
                          className={`text-sm mt-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-600"}`}
                        >
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Created {new Date(todo.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <fetcher.Form method="post">
                      <input type="hidden" name="_action" value="delete" />
                      <input type="hidden" name="id" value={todo.id} />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={fetcher.state === "submitting"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </fetcher.Form>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
