import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSクラス名を結合するユーティリティ関数
 * clsxとtailwind-mergeを使用してクラス名の競合を解決
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
