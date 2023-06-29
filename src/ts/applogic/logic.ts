import { isDisabled, isLoaded } from "./checks";
import type { App } from "./interface";

export class AppLogic {
  app: App;
  pid: number;

  constructor(a: App, p: number) {
    if (!isLoaded(a.id as string) || isDisabled(a.id as string)) return;

    this.app = a;
    this.pid = p;
  }
}
