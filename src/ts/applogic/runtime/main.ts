import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import type { App, AppEvents } from "../interface";
import { registerAppShortcuts } from "../keyboard/main";

export class AppRuntime {
  app: App;

  constructor(appData: App, events: AppEvents = {}) {
    if (!appData.id) {
      Log({
        source: `applogic/runtime/main.ts`,
        msg: `Can't create AppRuntime without valid app ID`,
        level: LogLevel.error,
      });

      return;
    }

    this.app = appData;
    this.app.events = events;

    if (!this.app.events.keyboardShortcuts) return;

    registerAppShortcuts(this.app.id, this.app);
  }
}
