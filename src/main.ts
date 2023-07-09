import App from "./App.svelte";
import { migrateToMulti } from "./ts/api/server";
import { Log } from "./ts/console";
import { LogLevel } from "./ts/console/interface";
import { preventAnchorRedirects } from "./ts/ui/anchor";

migrateToMulti();
preventAnchorRedirects();

document.addEventListener("contextmenu", (e) => e.preventDefault());

console.warn = (content: string, ...a: any) =>
  Log({
    source: "Console",
    msg: content + a.join(" "),
    level: LogLevel.warn,
  });

console.error = (content: string, ...a: any[]) =>
  Log({
    source: "Console",
    msg: content + a.join(" "),
    level: LogLevel.error,
  });

const app = new App({
  target: document.getElementById("app"),
});

export default app;
