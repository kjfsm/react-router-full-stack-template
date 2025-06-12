import { expect, test } from "@playwright/test";

test.describe("Todo App", () => {
  test("should allow users to view login page", async ({ page }) => {
    await page.goto("/login");

    // Check if login page loads correctly
    await expect(page.locator("h2")).toContainText("Sign in to your account");
    await expect(
      page.getByText("Welcome to the Remix Full Stack Template")
    ).toBeVisible();
  });

  test("should display message when no auth providers are configured", async ({
    page,
  }) => {
    await page.goto("/login");

    // Without auth env vars, should show configuration message
    await expect(
      page.getByText("No authentication providers configured")
    ).toBeVisible();
    await expect(
      page.getByText("Please set up your environment variables")
    ).toBeVisible();
  });

  test("should navigate between pages", async ({ page }) => {
    await page.goto("/");

    // Check home page
    await expect(
      page.getByRole("heading", { name: "🚀 Remix Full Stack Template" })
    ).toBeVisible();

    // Navigate to login
    await page.getByRole("link", { name: "Get Started →" }).click();
    await expect(page).toHaveURL("/login");

    // Navigate back to home
    await page.getByRole("link", { name: "← Back to home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should redirect to login when accessing protected routes", async ({
    page,
  }) => {
    await page.goto("/todos");

    // Should redirect to login page
    await expect(page).toHaveURL("/login");
    await expect(page.locator("h2")).toContainText("Sign in to your account");
  });
});
