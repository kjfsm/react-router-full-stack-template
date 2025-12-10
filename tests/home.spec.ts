import { expect, test } from "@playwright/test";

test("ホームにヘッダーとナビが表示される", async ({ page }) => {
  await page.goto("/");

  const header = page.locator("header");

  // アプリ名のリンクが見えること（ヘッダー内）
  await expect(header.getByRole("link", { name: "TODOアプリ" })).toBeVisible();

  // ログイン / 新規登録リンクが見えること（ヘッダー内）
  await expect(header.getByRole("link", { name: "ログイン" })).toBeVisible();
  await expect(header.getByRole("link", { name: "新規登録" })).toBeVisible();
});
