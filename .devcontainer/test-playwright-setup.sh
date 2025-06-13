#!/bin/bash

# Simple script for testing Playwright remote server setup
# Playwrightリモートサーバーセットアップのテスト用簡易スクリプト

set -e

echo "🎭 Testing Playwright Remote Server Setup..."
echo "🎭 Playwrightリモートサーバーセットアップをテストしています..."

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    echo "❌ Dockerがインストールされていないか、PATHに含まれていません"
    exit 1
fi

# Test if we can pull the Playwright image
echo "🐳 Testing Docker image pull..."
echo "🐳 Dockerイメージのプルをテスト..."
docker pull mcr.microsoft.com/playwright:v1.53.0-noble

# Test starting Playwright server
echo "🎭 Testing Playwright server startup..."
echo "🎭 Playwrightサーバーの起動をテスト..."
./.devcontainer/playwright-server.sh start

# Wait a moment
sleep 2

# Test server connectivity
echo "🔗 Testing server connectivity..."
echo "🔗 サーバー接続をテスト..."
if curl -f http://localhost:3000/ >/dev/null 2>&1; then
    echo "✅ Playwright server is accessible"
    echo "✅ Playwrightサーバーにアクセス可能です"
else
    echo "❌ Playwright server is not accessible"
    echo "❌ Playwrightサーバーにアクセスできません"
fi

# Show server logs
echo "📋 Server logs:"
echo "📋 サーバーログ:"
./.devcontainer/playwright-server.sh logs &
LOG_PID=$!

# Wait and then stop logs
sleep 3
kill $LOG_PID >/dev/null 2>&1 || true

# Stop server
echo "🛑 Stopping test server..."
echo "🛑 テストサーバーを停止しています..."
./.devcontainer/playwright-server.sh stop

echo "✅ Playwright remote server test completed!"
echo "✅ Playwrightリモートサーバーテスト完了!"