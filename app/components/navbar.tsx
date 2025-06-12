import type { User } from "~/types";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/todos" className="text-xl font-bold text-gray-900">
              📝 Todo App
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name || "User avatar"}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.name || user.email}
              </span>
            </div>

            <Form action="/logout" method="post">
              <Button variant="outline" size="sm">
                Sign out
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </nav>
  );
}
