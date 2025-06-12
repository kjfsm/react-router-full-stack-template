import { test, expect } from "@playwright/test";

test("homepage has title and links", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Remix Full Stack Template/);

  // Expect page to contain the main heading
  await expect(
    page.getByRole("heading", { name: "🚀 Remix Full Stack Template" }),
  ).toBeVisible();

  // Check for the demo link
  await expect(page.getByRole("link", { name: "View Todo Demo →" })).toBeVisible();
});