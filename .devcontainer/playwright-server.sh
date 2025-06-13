#!/bin/bash

# Script to manage Playwright Server in Docker
# DockerでPlaywrightサーバーを管理するスクリプト

set -e

ACTION=${1:-start}
CONTAINER_NAME="playwright-server"
PLAYWRIGHT_PORT=3001

case $ACTION in
  start)
    echo "🎭 DockerでPlaywrightサーバーを開始中..."
    
    # Stop existing container if running
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    
    # Start Playwright server
    docker run -d \
      --name $CONTAINER_NAME \
      --network="host" \
      --rm \
      --init \
      --workdir /home/pwuser \
      --user pwuser \
      mcr.microsoft.com/playwright:v1.53.0-noble \
      /bin/sh -c "npx -y playwright@1.53.0 run-server --port $PLAYWRIGHT_PORT --host 0.0.0.0"
    
    echo "🎭 Playwrightサーバーの準備完了を待機中..."
    
    # Wait for server to be ready
    for i in {1..30}; do
      if curl -f http://localhost:$PLAYWRIGHT_PORT/ 2>/dev/null | grep -q "Running"; then
        break
      fi
      sleep 1
    done
    
    # Final check
    if ! curl -f http://localhost:$PLAYWRIGHT_PORT/ 2>/dev/null | grep -q "Running"; then
      echo "❌ Playwrightサーバーの起動に失敗しました"
      docker logs $CONTAINER_NAME
      exit 1
    fi
    
    echo "✅ Playwrightサーバーの準備完了: ws://127.0.0.1:$PLAYWRIGHT_PORT/"
    ;;
    
  stop)
    echo "🎭 Playwrightサーバーを停止中..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    echo "✅ Playwrightサーバーを停止しました"
    ;;
    
  logs)
    echo "🎭 Playwrightサーバーのログを表示中..."
    docker logs -f $CONTAINER_NAME
    ;;
    
  *)
    echo "使用法: $0 {start|stop|logs}"
    exit 1
    ;;
esac