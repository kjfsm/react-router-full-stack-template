import { describe, expect, it } from "vitest";
import { cn } from "~/utils/cn";

describe("cnユーティリティ関数", () => {
  it("クラス名を正しく結合する", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("条件付きクラスを処理する", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("undefined/null値を処理する", () => {
    const result = cn("base-class", undefined, null, "other-class");
    expect(result).toBe("base-class other-class");
  });
});
