import { closeWindow } from "../applogic/events";
import type { App } from "../applogic/interface";
import { createOverlayableError } from "../errorlogic/overlay";
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

  constructor(t: HTMLDivElement, cS: CommandStore, a: App) {
    this.target = t;
    this.commands = cS;
    this.app = a;

    this.initialize();
  }

  public async evaluate(cmd: string, args?: string[]) {
    const command = this.getCommand(cmd);

    command.exec(cmd, args, this);

    await this.input.unlock();
  }

  private getCommand(command: string) {
    for (let i = 0; i < this.commands.length; i++) {
      if (this.commands[i].keyword == command) return this.commands[i];
    }

    return defaultCommand;
  }

  private initialize() {
    if (!this.target) return initError(this.app.id);

    this.target.innerText = "";

    this.env = new ArcTermEnv();
    this.input = new ArcTermInput(this.target, this.env, this);
    this.util = new ArcTermUtil(this.target, this.app, this, this.env);
  }

  public dispose() {
    if (!this.target) return;

    this.target.innerText = "";
  }
}
