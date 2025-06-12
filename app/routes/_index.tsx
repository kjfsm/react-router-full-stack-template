import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App - Remix Full Stack Template" },
    {
      name: "description",
      content: "A full-stack todo application built with Remix",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Remix Full Stack Template
            </h1>
            <p className="text-lg text-gray-600">
              A modern, production-ready template with best practices
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">🎯 Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Remix with TypeScript</li>
                <li>• Authentication (Google, GitHub)</li>
                <li>• Prisma + PostgreSQL</li>
                <li>• Tailwind CSS + shadcn/ui</li>
                <li>• Vitest + Playwright</li>
                <li>• Docker + DevContainer</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">🛠️ Development</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Biome for linting/formatting</li>
                <li>• GitHub Actions CI/CD</li>
                <li>• Firebase Hosting</li>
                <li>• Environment-driven config</li>
                <li>• GitHub Copilot ready</li>
                <li>• VS Code optimized</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">📦 Getting Started</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. Clone repository</li>
                <li>2. Copy .env.example to .env</li>
                <li>3. Run yarn install</li>
                <li>4. Run yarn dev</li>
                <li>5. Open in DevContainer</li>
                <li>6. Start building!</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Ready to start building your next great application?
            </p>
            <div className="space-x-4">
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started →
              </a>
              <a
                href="/todos"
                className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
