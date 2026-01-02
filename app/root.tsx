import {
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import { auth } from "./lib/.server/auth";
import { Button } from "./lib/generated/shadcn/components/ui/button";
import styles from "./tailwind.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja-JP">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession({ headers: request.headers });
  return { session };
};

export default function App() {
  const { session } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="border-b bg-background/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <Link to="/" className="font-semibold text-lg">
              TODOアプリ
            </Link>
          </div>
          <nav className="flex items-center gap-3">
            {session?.user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/todos">タスク</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/profile">プロフィール</Link>
                </Button>
                <div className="text-sm">
                  {session.user.name || session.user.email}
                </div>
                <Form method="post" action="/logout">
                  <Button type="submit" variant="outline">
                    ログアウト
                  </Button>
                </Form>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">ログイン</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">新規登録</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="mt-12 border-t">
        <div className="container mx-auto px-4 py-6 text-muted-foreground text-sm">
          © {new Date().getFullYear()} TODOアプリ
        </div>
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
