#!/bin/bash

# Script to run Playwright tests with remote server
# リモートサーバーでPlaywrightテストを実行するスクリプト

set -e

echo "🎭 Starting Playwright tests with remote server..."
echo "🎭 リモートサーバーでPlaywrightテストを開始しています..."

# Start Playwright server
echo "🎭 Starting Playwright server..."
echo "🎭 Playwrightサーバーを開始しています..."

# Check if server is already running, if not start it
if ! curl -f http://localhost:3000/ 2>/dev/null | grep -q "Running"; then
  ./.devcontainer/playwright-server.sh start
else
  echo "🎭 Playwright server is already running"
  echo "🎭 Playwrightサーバーは既に実行中です"
fi

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

# Run tests with remote connection
echo "🎭 Running Playwright tests..."
echo "🎭 Playwrightテストを実行しています..."

export PW_TEST_CONNECT_WS_ENDPOINT="ws://127.0.0.1:3000/"

# Run tests using the main config with local Playwright but remote browser execution
yarn playwright test "$@"

echo "✅ Playwright tests completed"
echo "✅ Playwrightテスト完了"
