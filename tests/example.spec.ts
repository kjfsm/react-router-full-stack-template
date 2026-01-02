import { expect, test } from "@playwright/test";

test("ホームのカードタイトルが表示される", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main").getByText("TODOアプリ")).toBeVisible();
});

test("ログインリンクからログイン画面へ遷移できる", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation")
    .getByRole("link", { name: "ログイン" })
    .click();

  await expect(
    page
      .getByRole("main")
      .locator('[data-slot="card-header"]', { hasText: "ログイン" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("button", { name: "ログイン", exact: true }),
  ).toBeVisible();
});
