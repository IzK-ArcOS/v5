import { Log, LogLevel } from "../../console";
import type { Process, App, ProcessEvents } from "../interface";
import { registerProcessShortcuts } from "../keyboard/main";

export class ProcessRuntime {
  process: Process;

  constructor(appData: App, events: ProcessEvents = {}) {
    if (!appData.id) {
      Log({
        source: `applogic/runtime/main.ts`,
        msg: `Can't create AppRuntime without valid app ID`,
        level: LogLevel.error,
      });

      return;
    }

    this.process.app = appData;
    this.process.app.events = events;

    if (!this.process.app.events.keyboardShortcuts) return;

    registerProcessShortcuts(this.process);
  }
}
