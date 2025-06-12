import { expect, test } from "@playwright/test";

test.describe("Todoアプリ", () => {
  test("ユーザーがログインページを表示できる", async ({ page }) => {
    await page.goto("/login");

    // ログインページが正しく読み込まれるかチェック
    await expect(page.locator("h2")).toContainText("Sign in to your account");
    await expect(
      page.getByText("Welcome to the Remix Full Stack Template")
    ).toBeVisible();
  });

  test("認証プロバイダーが設定されていない場合にメッセージを表示する", async ({
    page,
  }) => {
    await page.goto("/login");

    // 認証環境変数がない場合、設定メッセージを表示
    await expect(
      page.getByText("No authentication providers configured")
    ).toBeVisible();
    await expect(
      page.getByText("Please set up your environment variables")
    ).toBeVisible();
  });

  test("ページ間をナビゲーションできる", async ({ page }) => {
    await page.goto("/");

    // ホームページをチェック
    await expect(
      page.getByRole("heading", { name: "🚀 Remix フルスタックテンプレート" })
    ).toBeVisible();

    // ログインにナビゲート
    await page.getByRole("link", { name: "始める →" }).click();
    await expect(page).toHaveURL("/login");

    // ホームに戻る
    await page.getByRole("link", { name: "← Back to home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("保護されたルートにアクセスする際にログインにリダイレクトする", async ({
    page,
  }) => {
    await page.goto("/todos");

    // ログインページにリダイレクトする
    await expect(page).toHaveURL("/login");
    await expect(page.locator("h2")).toContainText("Sign in to your account");
  });
});
