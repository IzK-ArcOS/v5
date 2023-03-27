import type { App } from "../applogic/interface";
import { ArcOSVersion } from "../env/main";
import { ArcTermCommandHandler } from "./commands";
import { ArcTermEnv } from "./env";
import { initError } from "./error";
import { ArcTermInput } from "./input";
import type { Color, CommandStore } from "./interface";
import { ArcTermIntro } from "./intro";
import { ArcTermUtil } from "./util";
import { ArcTermVariables } from "./var";

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
  vars: ArcTermVariables;
  input: ArcTermInput;
  path: string;
  commandHandler: ArcTermCommandHandler;
  cb: (term: ArcTerm) => void;

  constructor(
    t: HTMLDivElement,
    cS: CommandStore,
    a: App,
    cb?: (term: ArcTerm) => void
  ) {
    this.target = t;
    this.commands = cS;
    this.app = a;
    this.cb = cb;

    this.initialize();
  }

  public async initialize() {
    if (!this.target) return initError(this.app.id);

    this.target.removeAttribute("style");

    this.path = "./";
    this.target.innerText = `v${ArcOSVersion}`;
    this.commandHandler = new ArcTermCommandHandler(this);
    this.env = new ArcTermEnv();
    this.vars = new ArcTermVariables(this);

    setTimeout(async () => {
      this.util = new ArcTermUtil(this);

      if (this.cb) await this.cb(this);

      this.input = new ArcTermInput(this);

      this.intro();

      this.target.setAttribute(
        "style",
        `--terminal-accent: var(--clr-${this.env.promptColor}-fg);`
      );

      if (!this.app) return;
      /* 
      this.app.size.w = this.env.width;
      this.app.size.h = this.env.height;

      WindowStore.set(get(WindowStore)); */
    }, 500);
  }

  public dispose() {
    if (!this.target) return;

    this.util.clear();
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
