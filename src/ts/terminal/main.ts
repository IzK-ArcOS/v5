import { get } from "svelte/store";
import type { App } from "../applogic/interface";
import { WindowStore } from "../applogic/store";
import { ArcTermEnv } from "./env";
import { initError } from "./error";
import { ArcTermInput } from "./input";
import type { CommandStore } from "./interface";
import { ArcTermIntro } from "./intro";
import { defaultCommand } from "./store";
import { ArcTermUtil } from "./util";

/**
 * @WARNING   This part of ArcOS is seperated from the Svelte framework in
 *            order to make it easier to write and manage. Frequent checks
 *            are performed throught ArcTerm classes in order to keep it clean
 *            and stop it from breaking unexpectedly.
 *
 * - IzKuipers, march 17 2023
 */

export class ArcTerm {
  target: HTMLDivElement;
  commands: CommandStore;
  app: App;
  util: ArcTermUtil;
  env: ArcTermEnv;
  input: ArcTermInput;
  path: string | false;

  constructor(t: HTMLDivElement, cS: CommandStore, a: App) {
    this.target = t;
    this.commands = cS;
    this.app = a;

    this.initialize();
  }

  public async evaluate(cmd: string, args?: string[]) {
    const command = this.getCommand(cmd);

    this.input.current.disabled = true;

    await command.exec(cmd, args, this);

    this.util.writeLine("\n");
    this.input.unlock();
  }

  private getCommand(command: string) {
    const c = command.toLowerCase();
    for (let i = 0; i < this.commands.length; i++) {
      const k = this.commands[i].keyword.toLowerCase();

      if (k == c) return this.commands[i];
    }

    return defaultCommand;
  }

  private async initialize() {
    if (!this.target) return initError(this.app.id);

    this.path = "./";
    this.target.innerText = "Loading configuration... Please wait...";
    this.env = new ArcTermEnv();

    setTimeout(() => {
      this.util = new ArcTermUtil(this);

      ArcTermIntro(this);

      this.util.writeLine(`${this.env.greeting}\n\n`);

      this.input = new ArcTermInput(this);
      if (!this.app) return;

      this.app.size.w = this.env.width;
      this.app.size.h = this.env.height;

      WindowStore.set(get(WindowStore));
    }, 500);
  }

  public dispose() {
    if (!this.target) return;

    this.target.innerText = "";
  }
}
