import type { App } from "../applogic/interface";
import type { ArcTermEnv } from "./env";
import type { Color } from "./interface";
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

    this.target.innerText = "";
  }

  public writeLine(str: string, inline = false) {
    const el = document.createElement("div");

    el.className = "part";

    if (inline) el.className += " inline";

    el.innerText = `${str}`;

    this.target.appendChild(el);
  }

  public write(str: string) {
    this.writeLine(str, true);
  }

  public writeColor(
    str: string,
    pri: Color,
    sec: Color = "white",
    inline = false,
    target = this.target
  ) {
    const x = str.split(/(\[[^\]]*\])/);

    const out = document.createElement("div");

    out.className = `part`;

    if (inline) out.className += " inline";

    for (let i = 0; i < x.length; i++) {
      const part = document.createElement("span");

      const isPart = x[i].startsWith("[") && x[i].endsWith("]");

      part.className = `clr-${isPart ? pri : sec}`;
      part.innerText = x[i].replaceAll("[", "").replaceAll("]", "");

      out.append(part);
    }

    target.append(out);
  }
}
