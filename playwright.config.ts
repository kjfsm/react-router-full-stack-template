import { defineConfig, devices } from "@playwright/test";

/**
 * E2Eテスト用Playwright設定
 *
 * この設定は、本番ビルドにPlaywrightを含めることなく、
 * 環境間で一貫したテストを行うため、DockerベースのPlaywrightサーバーを使用します。
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    // WebSocket接続経由でDocker Playwrightサーバーを使用
    connectOptions: {
      wsEndpoint:
        process.env.PW_TEST_CONNECT_WS_ENDPOINT || "ws://127.0.0.1:3001/",
    },
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* モバイルビューポートに対してテスト */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* テスト開始前にローカル開発サーバーを実行 */
  webServer: {
    command: "yarn dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});
