import App from "./App.svelte";
import { define } from "./ts/tauri";

const app = new App({
  target: document.getElementById("app"),
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

define();

export default app;
