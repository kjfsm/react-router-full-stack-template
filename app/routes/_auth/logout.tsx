import { redirect } from "react-router";
import { auth } from "~/lib/.server/auth";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  await auth.api.signOut({ headers: request.headers });
  return redirect("/");
}
