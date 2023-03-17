import type { App } from "../applogic/interface";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";

export class ArcTermUtil {
  target: HTMLDivElement;
  app: App;
  term: ArcTerm;
  env: ArcTermEnv;

  constructor(parent: ArcTerm) {
    this.target = parent.target;
    this.app = parent.app;
    this.term = parent;
    this.env = parent.env;
  }

  public writeLine(str: string) {
    const el = document.createElement("div");

    el.className = "part";
    el.innerText = `${str}`;

    this.target.appendChild(el);
  }
}
