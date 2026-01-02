import { expect, test } from "@playwright/test";

test("ホームのカードタイトルが表示される", async ({ page }) => {
  await page.goto("/");

  const main = page.locator("main");
  await expect(
    main.locator('[data-slot="card-header"]', { hasText: "TODOアプリ" }),
  ).toBeVisible();
});

test("ログインリンクからログイン画面へ遷移できる", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation")
    .getByRole("link", { name: "ログイン" })
    .click();

  const main = page.locator("main");
  await expect(
    main.locator('[data-slot="card-header"]', { hasText: "ログイン" }),
  ).toBeVisible();
  await expect(
    main.getByRole("button", { name: "ログイン", exact: true }),
  ).toBeVisible();
});
