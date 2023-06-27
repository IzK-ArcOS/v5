import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

export default app;
