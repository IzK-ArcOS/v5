import { get } from "svelte/store";
import { centerWindow } from "../applogic/center";
import type { App } from "../applogic/interface";
import { WindowStore } from "../applogic/store";
import { ArcOSVersion } from "../env/main";
import { ArcTermCommandHandler } from "./commands";
import { ArcTermEnv } from "./env";
import { initError } from "./error";
import { ArcTermInput } from "./input";
import type { Color, CommandStore } from "./interface";
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
  commandHandler: ArcTermCommandHandler;

  constructor(t: HTMLDivElement, cS: CommandStore, a: App) {
    this.target = t;
    this.commands = cS;
    this.app = a;

    this.initialize();
  }

  public async initialize() {
    if (!this.target) return initError(this.app.id);

    this.path = "./";
    this.target.innerText = `v${ArcOSVersion}`;
    this.commandHandler = new ArcTermCommandHandler(this);
    this.env = new ArcTermEnv();

    setTimeout(() => {
      this.util = new ArcTermUtil(this);
      this.input = new ArcTermInput(this);

      this.intro();

      if (!this.app) return;

      this.app.size.w = this.env.width;
      this.app.size.h = this.env.height;

      WindowStore.set(get(WindowStore));
    }, 500);
  }

  public dispose() {
    if (!this.target) return;

    this.target.innerText = "";
    this.util = null;
    this.env = null;
    this.input.lock();
    this.input = null;
  }

  private intro() {
    ArcTermIntro(this);

    this.util.writeColor(
      `${this.env.greeting}\n\n`,
      this.env.promptColor as Color
    );
  }
}
