import { auth } from "~/lib/.server/auth";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  return auth.api.signOut({ headers: request.headers });
}
