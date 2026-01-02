import { Outlet, redirect } from "react-router";
import { auth } from "~/lib/.server/auth";
import { userContext } from "~/lib/.server/context";
import type { Route } from "./+types/_layout";

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    const session = await auth.api.getSession({ headers: request.headers });
    const user = session?.user;

    if (!user) {
      throw redirect("/login");
    }

    context.set(userContext, user);

    return next();
  },
];

export default function Layout() {
  return <Outlet />;
}
