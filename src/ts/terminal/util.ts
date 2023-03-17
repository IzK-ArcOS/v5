import type { App } from "../applogic/interface";
import type { ArcTermEnv } from "./env";
import type { ArcTermInput } from "./input";
import type { ArcTerm } from "./main";

export class ArcTermUtil {
  target: HTMLDivElement;
  app: App;
  term: ArcTerm;
  env: ArcTermEnv;

  constructor(t: HTMLDivElement, a: App, parent: ArcTerm, e: ArcTermEnv) {
    this.target = t;
    this.app = a;
    this.term = parent;
    this.env = e;
  }

  public writeLine(str: string) {
    const el = document.createElement("div");

    el.className = "part";
    el.innerText = `${str}`;

    this.target.appendChild(el);
  }
}
