import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("github", request, {
    successRedirect: "/todos",
    failureRedirect: "/login",
  });
};
