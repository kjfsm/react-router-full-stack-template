import { expect, test } from "@playwright/test";

test.describe("Todoアプリ", () => {
  test("ユーザーがログインページを表示できる", async ({ page }) => {
    await page.goto("/login");

    // ログインページが正しく読み込まれるかチェック
    await expect(page.locator("h2")).toContainText("アカウントにサインイン");
    await expect(
      page.getByText("Remix フルスタックテンプレートへようこそ")
    ).toBeVisible();
  });

  test("認証プロバイダーが設定されていない場合にメッセージを表示する", async ({
    page,
  }) => {
    await page.goto("/login");

    // 認証環境変数がない場合、設定メッセージを表示
    await expect(
      page.getByText("認証プロバイダーが設定されていません")
    ).toBeVisible();
    await expect(
      page.getByText("GoogleまたはGitHubのOAuth用環境変数を設定してください")
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
    await page.getByRole("link", { name: "← ホームに戻る" }).click();
    await expect(page).toHaveURL("/");
  });

  test("保護されたルートにアクセスする際にログインにリダイレクトする", async ({
    page,
  }) => {
    await page.goto("/todos");

    // ログインページにリダイレクトする
    await expect(page).toHaveURL("/login");
    await expect(page.locator("h2")).toContainText("アカウントにサインイン");
  });
});
