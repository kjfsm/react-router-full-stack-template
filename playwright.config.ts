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
    // Use remote Playwright server if environment variable is set
    connectOptions: process.env.PW_TEST_CONNECT_WS_ENDPOINT
      ? {
          wsEndpoint: process.env.PW_TEST_CONNECT_WS_ENDPOINT,
        }
      : undefined,
    baseURL: process.env.PW_TEST_CONNECT_WS_ENDPOINT
      ? "http://hostmachine:3000"
      : "http://localhost:3000",
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
  webServer: process.env.PW_TEST_CONNECT_WS_ENDPOINT
    ? undefined
    : {
        command: "yarn dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
      },
});
