import { Link } from "react-router";
import { Button } from "~/lib/generated/shadcn/components/ui/button";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
      <Button asChild>
        <Link to="/signup">SignUp</Link>
      </Button>
      <Button asChild>
        <Link to="/signin">SignIn</Link>
      </Button>
    </div>
  );
}
