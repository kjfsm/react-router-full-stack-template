import { userContext } from "~/lib/.server/context";
import { prisma } from "~/lib/.server/prisma";
import { z } from "zod";
import { zfd } from "zod-form-data";
import type { Route } from "./+types/edit";

export async function action({ request, params, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  const id = params.todoId;
  const form = await request.formData();

  const { title } = zfd
    .formData({
      title: zfd.text(z.string().min(1)),
    })
    .parse(form);
  const todo = await prisma.todo.findFirst({
    where: { id, userId: user.id },
  });
  if (!todo) return null;

  return prisma.todo.update({ where: { id }, data: { title } });
}
