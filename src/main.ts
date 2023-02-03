import App from "./App.svelte";

console.warn(
  `⚠️ ArcOS Logger does not log here anymore. Please check SystemLoggerApp for the logs.`
);

const app = new App({
  target: document.getElementById("app"),
});

export default app;
