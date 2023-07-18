import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import type { App } from "../interface";

export class AppRuntime {
  app: App;

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
}
