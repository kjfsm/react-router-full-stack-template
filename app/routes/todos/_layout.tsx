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

    // auth の session.user の `image` は `string | null | undefined` になる場合があるため、context に渡す前に undefined を null に正規化する
    const normalizedUser = {
      ...user,
      image: user.image ?? null,
    };

    context.set(userContext, normalizedUser);

    return next();
  },
];

export default function Layout() {
  return <Outlet />;
}
