import { Log, LogLevel } from "../console";
import type { Color } from "./interface";
import { ArcTermIntro } from "./intro";
import type { ArcTerm } from "./main";

export class ArcTermUtil {
  term: ArcTerm;
  private reference = "";

  constructor(t: ArcTerm) {
    this.setReference();

    Log({
      source: `ArcTerm ${this.reference}`,
      msg: `Creating new ArcTermUtil`,
      level: LogLevel.info,
    });

    this.term = t;
  }

  public getReference() {
    return this.reference;
  }

  private setReference() {
    const rnd = () => Math.floor(Math.random() * 1e6);

    this.reference = `${rnd()}-${rnd()}-${rnd()}-${rnd()}`;
  }

  public flushAccent() {
    if (this.term.app) return;

    this.term.target.setAttribute(
      "style",
      `--terminal-accent: var(--clr-${this.term.env.promptColor}-fg);`
    );
  }

  public intro() {
    if (!this.term || !this.term.std) return;

    ArcTermIntro(this.term);

    this.term.std.writeColor(
      `${this.term.env.greeting}\n\n`,
      this.term.env.promptColor as Color
    );
  }
}
