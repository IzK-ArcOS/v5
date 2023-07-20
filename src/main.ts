import App from "./App.svelte";
import { migrateToMulti } from "./ts/api/server";
import { Log } from "./ts/console";
import { LogLevel } from "./ts/console/interface";
import { errorMessage } from "./ts/errorlogic/main";
import { preventAnchorRedirects } from "./ts/ui/anchor";

migrateToMulti();
preventAnchorRedirects();

document.addEventListener("contextmenu", (e) => e.preventDefault());

console.warn = (content: string, ...a: any) =>
  !content.includes("unknown prop") &&
  Log("Console", content + a.join(" "), LogLevel.warn);

console.error = (content: string, ...a: any[]) =>
  Log("Console", content + a.join(" "), LogLevel.error);

const app = new App({
  target: document.getElementById("app"),
});

export default app;
