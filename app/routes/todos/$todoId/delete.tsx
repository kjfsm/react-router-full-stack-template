import { redirect } from "react-router";
import { auth } from "~/lib/.server/auth";
import { prisma } from "~/lib/.server/prisma";
import type { Route } from "./+types/delete";

export async function action({ request, params }: Route.ActionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    throw redirect("/login");
  }
  const id = params.todoId;
  const todo = await prisma.todo.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!todo) return null;

  await prisma.todo.delete({ where: { id } });
  return redirect("/todos");
}
