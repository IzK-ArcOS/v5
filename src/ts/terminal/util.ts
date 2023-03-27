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

    this.clear();
  }

  public writeLine(str: string, inline = false, target = this.target) {
    const el = document.createElement("div");

    el.className = "part";

    if (inline) el.className += " inline";

    el.innerText = str;

    target.appendChild(el);

    return el;
  }

  public writeSeperator(length: number) {
    this.writeLine(``.padEnd(length, "-"));
  }

  public Error(context: string) {
    this.writeColor(`[Error]: ${context}`, "red");
  }

  public write(str: string, target = this.target) {
    const el = this.writeLine(str, true, target);

    return el;
  }

  public update(el: HTMLDivElement, str: string) {
    if (!el) return false;

    el.innerText = "";

    this.write(str, this.target);
  }

  public updateColor(el: HTMLDivElement, str: string, color: Color) {
    if (!el) return false;

    el.innerText = "";

    this.writeColor(str, color, "white", false, el);
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

    out.className = `part `;

    if (inline) out.className += " inline";

    for (let i = 0; i < x.length; i++) {
      const part = document.createElement("span");
      const isPart = x[i].startsWith("[") && x[i].endsWith("]");
      const content = x[i].replaceAll("[", "").replaceAll("]", "");

      part.className = `clr-${isPart ? pri : sec}`;
      part.innerText = content;

      out.append(part);
    }

    target.append(out);

    return out;
  }

  public writeImage(src: string, height: number) {
    const el = document.createElement("img");

    el.className = "image";
    el.style.height = `${height}em`;
    el.src = src;

    this.target.append(el);
  }

  public clear() {
    this.target.innerText = "";
  }
}
