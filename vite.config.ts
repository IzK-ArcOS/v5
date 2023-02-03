import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $apps: path.resolve("./src/lib/Apps"),
      "@assets": path.resolve("./src/assets"),
      "@css": path.resolve("./src/css"),
    },
  },
});
