import { zfd } from "zod-form-data";
import { userContext } from "~/lib/.server/context";
import { prisma } from "~/lib/.server/prisma";
import type { Route } from "./+types/edit";

export async function action({ request, params, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  const id = params.todoId;
  const formData = await request.formData();
  const { done } = zfd
    .formData({
      done: zfd.text(),
    })
    .parse(formData);

  const todo = await prisma.todo.findFirst({
    where: { id, userId: user.id },
  });
  if (!todo) return null;

  return prisma.todo.update({
    where: { id },
    data: { done: done === "true" },
  });
}
