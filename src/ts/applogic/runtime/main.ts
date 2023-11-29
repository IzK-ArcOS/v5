import { writable } from "svelte/store";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import type { App } from "../interface";

export class AppRuntime {
  app: App;
  public PAGES = [];
  public readonly CurrentPage = writable<string>("");

  constructor(appData: App) {
    if (!appData.id) {
      Log(
        `applogic/runtime/main.ts`,
        `Can't create AppRuntime without valid app ID`,
        LogLevel.error
      );

      return;
    }

    this.app = appData;
  }

  public Log(
    message: string,
    fn: string = "<anonymous>",
    level = LogLevel.info
  ) {
    Log(`${this.app.id}Runtime: ${fn}`, message, level);
  }

  public switchPage(page: string): boolean {
    this.Log(`Switching page to ${page}`, "switchPage");

    if (!this.PAGES.includes(page)) {
      this.Log(`Page ${page} doesn't exist!`, "switchPage", LogLevel.error);

      return false;
    }

    this.CurrentPage.set(page);
    this.onSwitchPage();

    return true;
  }

  public onSwitchPage() {
    this.Log("Page changed!", "onSwitchPage");
  }
}
