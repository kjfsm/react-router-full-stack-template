import { vite } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vite({
      ignoredRouteFiles: ["**/.*"],
    }),
  ],
});