import { get } from "svelte/store";
import { getServer } from "../api/server";
import { Log } from "../console";
import { UserName } from "../userlogic/interfaces";
import type { Color } from "./interface";
import { ArcTermIntro } from "./intro";
import type { ArcTerm } from "./main";

export class ArcTermUtil {
  term: ArcTerm;
  private reference = "";

  constructor(t: ArcTerm) {
    this.setReference();

    Log(`ArcTerm ${this.reference}`, `Creating new ArcTermUtil`);

    this.term = t;
  }

  public getReference() {
    Log(`ArcTerm ${this.reference}`, this.reference);
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

    const out = this.term.vars.replace(this.term.env.greeting);

    this.term.std.writeColor(`${out}\n\n`, this.term.env.promptColor as Color);
  }
}
