// app/routes/login.tsx
import { data, redirect } from "react-router";
import { auth } from "~/lib/.server/auth";
import type { Route } from "./+types/email";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  if (!response.ok) {
    const message = await response.text();
    return data({ error: message }, { status: 400 });
  }
  return redirect("/todos", { headers: response.headers });
}
