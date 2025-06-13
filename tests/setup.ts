// Vitest用テストセットアップファイル
import { expect, vi } from "vitest";

// 必要に応じてfetchをモック
global.fetch = vi.fn();

// グローバルテストユーティリティをここでセットアップ
