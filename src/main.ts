import App from "./App.svelte";
import { define, inTauri } from "./ts/tauri";

const app = new App({
  target: document.getElementById("app"),
});

define();

export default app;
