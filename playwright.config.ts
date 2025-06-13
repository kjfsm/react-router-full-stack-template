import { defineConfig, devices } from "@playwright/test";

/**
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
    // Always use remote Playwright server via WebSocket connection
    // Only fall back to local if explicitly disabled
    connectOptions: process.env.PW_TEST_DISABLE_REMOTE !== "true"
      ? {
          wsEndpoint: process.env.PW_TEST_CONNECT_WS_ENDPOINT || "ws://127.0.0.1:3000/",
        }
      : undefined,
    // Use hostmachine for Docker remote server when in CI or Docker, localhost otherwise
    baseURL: process.env.PW_TEST_DISABLE_REMOTE !== "true"
      ? process.env.CI ? "http://hostmachine:3030" : "http://localhost:3030"
      : "http://localhost:3030",
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

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.PW_TEST_DISABLE_REMOTE !== "true"
    ? {
        command: "yarn dev",
        url: "http://localhost:3030",
        reuseExistingServer: !process.env.CI,
      }
    : {
        command: "yarn dev",
        url: "http://localhost:3030",
        reuseExistingServer: !process.env.CI,
      },
});
