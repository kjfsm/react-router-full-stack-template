# 🚀 Remix フルスタックテンプレート

Remixを使用したモダンで本格的なフルスタックテンプレート。認証、データベース統合、UIコンポーネント、テスト、デプロイメント自動化を含みます。

## ✨ 機能

- **🎯 Remix フレームワーク** - SSRとプログレッシブエンハンスメントを備えたモダンなフルスタックReactフレームワーク
- **🔐 認証** - remix-authによるGoogleとGitHubのOAuth統合
- **🗄️ データベース** - 型安全なデータベース操作のためのPostgreSQLとPrisma ORM
- **🎨 UIコンポーネント** - shadcn/uiコンポーネントライブラリを使用したTailwind CSS
- **🧪 テスト** - ユニットテスト用Vitestとエンドツーエンドテスト用Playwright
- **🐳 DevContainer** - Dockerによる一貫した開発環境
- **🚀 デプロイメント** - GitHub Actions CI/CDによるFirebase Hosting
- **🔧 開発者ツール** - リント/フォーマット用Biome、TypeScriptなど
- **🤖 AI対応** - 詳細な説明書付きGitHub Copilot統合

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|----------|--------------|
| **フレームワーク** | Remix, React, TypeScript, Vite |
| **データベース** | PostgreSQL, Prisma ORM |
| **認証** | remix-auth, Google OAuth, GitHub OAuth |
| **UI/スタイリング** | Tailwind CSS, shadcn/ui, Radix UI |
| **テスト** | Vitest, Playwright, Docker |
| **開発** | DevContainer, Docker Compose, Biome |
| **デプロイメント** | Firebase Hosting, GitHub Actions |
| **パッケージマネージャー** | Yarn |

## 🚀 クイックスタート

### 前提条件

- Node.js 18+ 
- Docker と Docker Compose
- Git

### 1. クローンとセットアップ

```bash
# リポジトリをクローン
git clone <your-repo-url>
cd remix-full-stack-template

# 環境変数をコピー
cp .env.example .env

# 依存関係をインストール
yarn install
```

### 2. 開発環境の開始

#### オプションA: DevContainer（推奨）
1. VS Codeでプロジェクトを開く
2. プロンプトが表示されたら「コンテナで再開」をクリック
3. VS Codeが開発環境をビルドして開始します

#### オプションB: ローカル開発
```bash
# データベースを開始
docker-compose up -d db

# Prismaクライアントを生成してデータベースをセットアップ
yarn db:generate
yarn db:push

# 開発サーバーを開始
yarn dev
```

### 3. 認証の設定（オプション）

OAuth認証を有効にするには、プロバイダーを設定して`.env`に認証情報を追加します：

#### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com/)に移動
2. OAuth 2.0 認証情報を作成
3. リダイレクトURIを追加：`http://localhost:3000/auth/google/callback`
4. `.env`に認証情報を追加：
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

#### GitHub OAuth
1. [GitHub Developer Settings](https://github.com/settings/developers)に移動
2. 新しいOAuthアプリを作成
3. コールバックURLを設定：`http://localhost:3000/auth/github/callback`
4. `.env`に認証情報を追加：
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

## 📁 プロジェクト構造

```
├── app/
│   ├── components/          # 再利用可能なReactコンポーネント
│   │   └── ui/             # shadcn/ui コンポーネント
│   ├── lib/                # サーバーサイドユーティリティ
│   │   ├── auth.server.ts  # 認証ロジック
│   │   ├── db.server.ts    # データベースクライアント
│   │   └── session.server.ts # セッション管理
│   ├── routes/             # Remixルート（ファイルベースルーティング）
│   ├── styles/             # グローバルスタイルとCSS
│   └── utils/              # クライアントサイドユーティリティ
├── prisma/
│   ├── schema.prisma       # データベーススキーマ
│   └── seed.ts            # データベースシーディング
├── e2e/                   # Playwright エンドツーエンドテスト
├── tests/                 # テストユーティリティとセットアップ
├── .devcontainer/         # DevContainer設定
├── .github/workflows/     # GitHub Actions CI/CD
└── docker-compose*.yml    # Docker設定
```

## 🧪 テスト

```bash
# ユニットテストを実行
yarn test

# E2Eテストを実行（開発サーバーが動作している必要があります）
yarn test:e2e

# Playwrightブラウザをインストール（初回のみ）
npx playwright install
```

## 🚀 デプロイメント

### Firebase Hosting

1. **Firebase プロジェクトのセットアップ**
   ```bash
   # Firebase CLIをインストール
   npm install -g firebase-tools
   
   # ログインして初期化
   firebase login
   firebase init
   ```

2. **GitHub Secretsの設定**
   GitHubリポジトリに以下のシークレットを追加してください：
   - `DATABASE_URL` - 本番データベース接続文字列
   - `SESSION_SECRET` - セッション暗号化用ランダムシークレット
   - `FIREBASE_SERVICE_ACCOUNT` - Firebase サービスアカウント JSON
   - `FIREBASE_PROJECT_ID` - Firebase プロジェクト ID
   - OAuth認証情報（認証を使用する場合）

3. **デプロイ**
   ```bash
   # mainブランチへのプッシュで自動デプロイがトリガーされます
   git push origin main
   ```

### 手動デプロイメント

```bash
# 本番用にビルド
yarn build

# 本番サーバーを開始
yarn start
```

## 🛠️ 開発

### 利用可能なスクリプト

| コマンド | 説明 |
|---------|-------------|
| `yarn dev` | 開発サーバーを開始 |
| `yarn build` | 本番用にビルド |
| `yarn start` | 本番サーバーを開始 |
| `yarn lint` | リンターを実行 |
| `yarn lint:fix` | リントの問題を修正 |
| `yarn format` | コードをフォーマット |
| `yarn test` | ユニットテストを実行 |
| `yarn test:e2e` | E2Eテストを実行 |
| `yarn typecheck` | TypeScript型チェック |
| `yarn db:generate` | Prismaクライアントを生成 |
| `yarn db:push` | スキーマ変更をデータベースにプッシュ |
| `yarn db:migrate` | マイグレーションを作成して実行 |
| `yarn db:studio` | Prisma Studioを開く |

### データベース管理

```bash
# スキーマ変更後にPrismaクライアントを生成
yarn db:generate

# スキーマ変更を開発データベースにプッシュ
yarn db:push

# 本番用マイグレーションを作成
yarn db:migrate

# データベースGUIを開く
yarn db:studio

# サンプルデータでデータベースをシード
yarn db:seed
```

## 🔧 設定

### 環境変数

`.env.example`を`.env`にコピーして設定してください：

```bash
# データベース
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remixapp_dev"

# 認証
SESSION_SECRET="your-session-secret-change-this-in-production"

# OAuth（オプション）
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### Docker開発

テンプレートには一貫した開発のためのDocker設定が含まれています：

- `docker-compose.dev.yml` - データベース付き開発環境
- `docker-compose.yml` - 本番環境
- `.devcontainer/` - VS Code DevContainer設定

## 🤖 GitHub Copilot統合

このテンプレートには包括的なCopilot統合が含まれています：

- `copilot-instructions.md` - AIアシスタンス用の詳細な説明書
- `copilot-setup-steps.yml` - ステップバイステップのセットアップガイド
- AI理解に最適化されたコード構造
- 豊富なドキュメントとコメント

## 📚 主要概念

### Remix哲学
- **サーバーサイドレンダリング** - パフォーマンスとSEO向上のためのデフォルト
- **プログレッシブエンハンスメント** - JavaScriptなしでも動作
- **Web標準** - フレームワーク抽象化よりも優先
- **ネストルーティング** - より良いユーザーエクスペリエンス
- **フォームとミューテーション** - Web標準を使用

### 認証フロー
1. ユーザーがログインボタンをクリック
2. OAuthプロバイダー（Google/GitHub）にリダイレクト
3. プロバイダーが認証コードでリダイレクトバック
4. サーバーがコードをユーザープロファイルと交換
5. データベースでユーザーレコードを作成/更新
6. 安全なクッキーでセッションを確立

### データベースパターン
- **型安全クエリ** - Prismaを使用
- **ユーザーデータ分離** - 認証済みユーザーにスコープされたすべてのクエリ
- **楽観的更新** - Remixの`useFetcher`を使用
- **スキーママイグレーション** - 本番デプロイメント用

## 🔒 セキュリティ

- **セッション管理** - 安全なHTTPオンリークッキー
- **CSRF保護** - Remixフォームに組み込み
- **SQLインジェクション防止** - Prismaの型安全クエリ
- **環境変数の検証**
- **OAuthセキュリティ** - プロバイダーのベストプラクティスに従う

## 📈 パフォーマンス

- **サーバーサイドレンダリング** - 高速な初期ページロード
- **自動コード分割** - Remixによる
- **楽観的UI更新** - より良い体感パフォーマンス
- **データベースクエリ最適化** - Prismaによる
- **静的アセット最適化** - Viteによる

## 🤝 貢献

1. リポジトリをフォーク
2. 機能ブランチを作成：`git checkout -b feature-name`
3. 変更を加えてテストを追加
4. テストを実行：`yarn test && yarn test:e2e`
5. 変更をコミット：`git commit -m 'Add feature'`
6. ブランチにプッシュ：`git push origin feature-name`
7. プルリクエストを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🆘 トラブルシューティング

### よくある問題

**データベース接続エラー**
```bash
# PostgreSQLが実行されていることを確認
docker-compose up -d db

# .envの接続文字列を確認
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remixapp_dev"
```

**認証が機能しない**
- `.env`のOAuth認証情報を確認
- コールバックURLがプロバイダー設定と一致することを確認
- OAuthアプリが適切に設定されていることを確認

**ビルド失敗**
```bash
# TypeScriptエラーを確認
yarn typecheck

# 依存関係を確認
yarn install
```

**テスト失敗**
```bash
# テストデータベースが実行されていることを確認
docker-compose --profile test up -d

# テストを個別実行
yarn test --reporter=verbose
```

詳細なトラブルシューティングについては、`copilot-setup-steps.yml`を参照してください。

## 🌟 次のステップ

- [ ] より多くの認証プロバイダーを追加（Discord、Twitterなど）
- [ ] メール/パスワード認証を実装
- [ ] ファイルアップロード機能を追加
- [ ] 外部APIとの統合
- [ ] WebSocketを使用したリアルタイム機能を追加
- [ ] キャッシュ戦略を実装
- [ ] モニタリングと分析を追加
- [ ] React Nativeでモバイルアプリを作成

---

**楽しいコーディングを！ 🎉**

詳細なセットアップ手順とAIアシスタンスについては、`copilot-instructions.md`と`copilot-setup-steps.yml`ファイルをご確認ください。
