import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $apps: fileURLToPath(new URL("./src/lib/Apps", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@css": fileURLToPath(new URL("./src/css", import.meta.url)),
      $$ts: path.resolve(__dirname, "./src/ts"),
    },
  },
});
