import { describe, expect, it } from "vitest";
import { cn } from "~/utils/cn";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should handle undefined/null values", () => {
    const result = cn("base-class", undefined, null, "other-class");
    expect(result).toBe("base-class other-class");
  });
});
