import { userContext } from "~/lib/.server/context";
import { prisma } from "~/lib/.server/prisma";
import type { Route } from "./+types/delete";

export async function action({ params, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  const id = params.todoId;
  const todo = await prisma.todo.findFirst({
    where: { id, userId: user.id },
  });
  if (!todo) return null;

  return prisma.todo.delete({ where: { id } });
}
