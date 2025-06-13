#!/bin/bash

# Script to run Playwright tests with remote server
# リモートサーバーでPlaywrightテストを実行するスクリプト

set -e

echo "🎭 Starting Playwright tests with remote server..."
echo "🎭 リモートサーバーでPlaywrightテストを開始しています..."

# Start Playwright server
echo "🎭 Starting Playwright server..."
echo "🎭 Playwrightサーバーを開始しています..."
./.devcontainer/playwright-server.sh start

# Function to cleanup on exit
cleanup() {
    echo "🎭 Cleaning up Playwright server..."
    echo "🎭 Playwrightサーバーをクリーンアップしています..."
    ./.devcontainer/playwright-server.sh stop
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Run tests with remote connection
echo "🎭 Running Playwright tests..."
echo "🎭 Playwrightテストを実行しています..."

export PW_TEST_CONNECT_WS_ENDPOINT="ws://127.0.0.1:3000/"

# Use npx to run playwright without having it as a dependency
npx -y playwright@1.53.0 test "$@"

echo "✅ Playwright tests completed"
echo "✅ Playwrightテスト完了"
