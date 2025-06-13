#!/bin/bash

# Script to manage Playwright Server in Docker
# プレイライトサーバーをDocker管理するスクリプト

set -e

ACTION=${1:-start}
CONTAINER_NAME="playwright-server"
PLAYWRIGHT_PORT=3000

case $ACTION in
  start)
    echo "🎭 Starting Playwright Server in Docker..."
    echo "🎭 DockerでPlaywrightサーバーを開始しています..."
    
    # Stop existing container if running
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    
    # Start Playwright server
    docker run -d \
      --name $CONTAINER_NAME \
      --add-host=hostmachine:host-gateway \
      -p $PLAYWRIGHT_PORT:$PLAYWRIGHT_PORT \
      --rm \
      --init \
      --workdir /home/pwuser \
      --user pwuser \
      mcr.microsoft.com/playwright:v1.53.0-noble \
      /bin/sh -c "npx -y playwright@1.53.0 run-server --port $PLAYWRIGHT_PORT --host 0.0.0.0"
    
    echo "🎭 Waiting for Playwright server to be ready..."
    echo "🎭 Playwrightサーバーの準備完了を待機中..."
    
    # Wait for server to be ready
    timeout 30 bash -c 'until curl -f http://localhost:3000/ 2>/dev/null; do sleep 1; done' || {
      echo "❌ Playwright server failed to start"
      echo "❌ Playwrightサーバーの開始に失敗しました"
      exit 1
    }
    
    echo "✅ Playwright server is ready at ws://127.0.0.1:$PLAYWRIGHT_PORT/"
    echo "✅ Playwrightサーバーの準備完了: ws://127.0.0.1:$PLAYWRIGHT_PORT/"
    ;;
    
  stop)
    echo "🎭 Stopping Playwright Server..."
    echo "🎭 Playwrightサーバーを停止しています..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    echo "✅ Playwright server stopped"
    echo "✅ Playwrightサーバーを停止しました"
    ;;
    
  logs)
    echo "🎭 Showing Playwright Server logs..."
    echo "🎭 Playwrightサーバーのログを表示..."
    docker logs -f $CONTAINER_NAME
    ;;
    
  *)
    echo "Usage: $0 {start|stop|logs}"
    echo "使用方法: $0 {start|stop|logs}"
    exit 1
    ;;
esac