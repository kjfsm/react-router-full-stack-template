import {
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
      <header>
        {session?.user ? (
          <div className="bg-gray-200 p-4 text-right">
            Logged in as {session.user.name || session.user.email}
          </div>
        ) : (
          <Link
            to="/auth/google"
            className="inline-block bg-gray-200 p-4 text-right"
          >
            Login
          </Link>
        )}
      </header>
      <Outlet />
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
