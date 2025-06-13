#!/bin/bash

# DockerでPlaywrightテストを実行するスクリプト
# Script to run Playwright tests with Docker

set -e

echo "🎭 DockerでPlaywrightテストを開始しています..."
echo "🎭 Starting Playwright tests with Docker..."

# 開発サーバーが起動しているかチェック
# Check if dev server is running
if ! curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "❌ 開発サーバーが起動していません。先に 'yarn dev' を実行してください。"
    echo "❌ Dev server is not running. Please run 'yarn dev' first."
    exit 1
fi

# DockerでPlaywrightテストを実行
# Run Playwright tests with Docker
docker run --rm \
    --network host \
    -v "$(pwd)":/workspace \
    -w /workspace \
    -e DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@db:5432/remixapp_dev}" \
    -e SESSION_SECRET="${SESSION_SECRET:-dev-session-secret-change-in-production}" \
    mcr.microsoft.com/playwright:v1.40.0-jammy \
    sh -c "npm install && npx playwright test $*"

echo "✅ Playwrightテスト完了"
echo "✅ Playwright tests completed"