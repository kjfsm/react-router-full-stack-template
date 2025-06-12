import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

export const loader = () => redirect("/login");

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("github", request);
};
