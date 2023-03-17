import { get } from "svelte/store";
import { ConnectedServer } from "../api/main";
import type { App } from "../applogic/interface";
import { ArcTermEnv } from "./env";
import { initError } from "./error";
import { ArcTermInput } from "./input";
import type { CommandStore } from "./interface";
import { defaultCommand } from "./store";
import { ArcTermUtil } from "./util";

/**
 * @WARNING   This part of ArcOS is seperated from the Svelte framework in
 *            order to make it easier to write and manage.
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

    await command.exec(cmd, args, this);

    this.input.unlock();
  }

  private getCommand(command: string) {
    for (let i = 0; i < this.commands.length; i++) {
      if (this.commands[i].keyword == command) return this.commands[i];
    }

    return defaultCommand;
  }

  private initialize() {
    if (!this.target) return initError(this.app.id);

    this.path = get(ConnectedServer) ? "./" : false;

    this.target.innerText = "";

    this.env = new ArcTermEnv();
    this.input = new ArcTermInput(this);
    this.util = new ArcTermUtil(this);
  }

  public dispose() {
    if (!this.target) return;

    this.target.innerText = "";
  }
}
