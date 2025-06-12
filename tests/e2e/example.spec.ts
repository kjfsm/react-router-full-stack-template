import { expect, test } from "@playwright/test";

test("ホームページにタイトルとリンクがある", async ({ page }) => {
  await page.goto("/");

  // タイトルに部分文字列が含まれることを期待
  await expect(page).toHaveTitle(/Remix フルスタックテンプレート/);

  // ページにメインヘッディングが含まれることを期待
  await expect(
    page.getByRole("heading", { name: "🚀 Remix フルスタックテンプレート" })
  ).toBeVisible();

  // デモリンクを確認
  await expect(page.getByRole("link", { name: "デモを見る" })).toBeVisible();
});
