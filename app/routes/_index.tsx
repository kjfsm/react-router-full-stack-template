import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App - Remix フルスタックテンプレート" },
    {
      name: "description",
      content: "Remixで構築されたフルスタックtodoアプリケーション",
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
              🚀 Remix フルスタックテンプレート
            </h1>
            <p className="text-lg text-gray-600">
              ベストプラクティスを備えたモダンで本格的なテンプレート
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">🎯 機能</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• TypeScript付きRemix</li>
                <li>• 認証（Google、GitHub）</li>
                <li>• Prisma + PostgreSQL</li>
                <li>• Tailwind CSS + shadcn/ui</li>
                <li>• Vitest + Playwright</li>
                <li>• Docker + DevContainer</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">🛠️ 開発</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• リント/フォーマット用Biome</li>
                <li>• GitHub Actions CI/CD</li>
                <li>• Firebase Hosting</li>
                <li>• 環境変数ベース設定</li>
                <li>• GitHub Copilot対応</li>
                <li>• VS Code最適化</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">📦 始め方</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1. リポジトリをクローン</li>
                <li>2. .env.exampleを.envにコピー</li>
                <li>3. yarn installを実行</li>
                <li>4. yarn devを実行</li>
                <li>5. DevContainerで開く</li>
                <li>6. ビルドを開始！</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              次の素晴らしいアプリケーションの構築を始める準備はできましたか？
            </p>
            <div className="space-x-4">
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                始める →
              </a>
              <a
                href="/todos"
                className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                デモを見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
