# react-router-full-stack-template

このリポジトリは React Router ベースのフルスタックテンプレートです。

セットアップ（ローカル）

1. 依存関係をインストール

```bash
pnpm install
```

2. Playwright ブラウザをインストール

```bash
pnpm exec playwright install --with-deps
# もしくは
pnpm run playwright:install
```

3. 開発サーバーを起動してから E2E を実行する

```bash
# 別ターミナルで開発サーバーを起動
pnpm dev

# 別ターミナルでテストを実行
pnpm test:e2e
```

備考
- `playwright.config.ts` に `webServer` を設定しているため、`pnpm test:e2e` は自動的に `pnpm dev` を試みます（既に dev サーバーが立ち上がっている場合は再利用します）。
- テストは `tests/` フォルダ内を走ります。

ログ

実行結果は `playwright-report/` に出力されます（HTML レポート）。

# remix-full-stack-template
