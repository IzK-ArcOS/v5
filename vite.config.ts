import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { plugin as markdown } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), markdown()],
  base: "",
  build: {
    minify: false,
  },
});
