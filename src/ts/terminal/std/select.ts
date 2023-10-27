import { get, writable } from "svelte/store";
import { focusedWindowId } from "../../applogic/store";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import type { ArcTermStd } from "../std";
import sleep from "../../sleep";
import type { Color } from "../interface";

export class ArcTermStdSelect {
  private std: ArcTermStd;
  private _sent = writable(false);
  private _options = [];
  private _index = 0;
  private _elements: HTMLDivElement[] = [];
  private _color: Color;

  constructor(std: ArcTermStd, color?: Color) {
    Log(
      `ArcTerm ${std.term.referenceId}`,
      `Creating new ArcTermStdSelect`,
      LogLevel.info
    );

    this._color = color || "blue";
    this.std = std;
  }

  private getStr(index: number, string: number): string {
    const current = index == this._index;
    const sent = get(this._sent) && current;
    const prefix = current ? "> [" : "  ";
    const suffix = `${current ? "]" : ""}${sent ? " <" : ""}`;

    return `${prefix}${index + 1}. ${string}${suffix}`;
  }

  private draw() {
    for (let i = 0; i < this._elements.length; i++) {
      const element = this._elements[i];

      this.std.updateColor(
        element,
        this.getStr(i, this._options[i]),
        this._color,
        "gray"
      );
    }
  }

  private keyDown(e: KeyboardEvent): void {
    const app = this.std.term.app;

    if (!e.key || get(this._sent) || (app && get(focusedWindowId) !== app.id))
      return;

    const key = e.key.toLowerCase();
    const min = 0;
    const max = this._options.length - 1;

    switch (key) {
      case "arrowup":
        this._index--;

        if (this._index < min) this._index = min;

        break;
      case "arrowdown":
        this._index++;

        if (this._index > max) this._index = max;

        break;
      case "escape":
        this._index = min;
      case "enter":
        document.removeEventListener("keydown", this.keyDown);

        this._sent.set(true);
    }

    this.draw();
  }

  public async create(options: string[]) {
    if (get(this._sent)) return 0;

    await sleep(10);

    this._index = 0;
    this._options = options;

    for (let i = 0; i < options.length; i++) {
      const str = this.getStr(i, this._options[i]);
      const element = this.std.writeColor(str, this._color, "gray");

      this._elements.push(element);
    }

    document.addEventListener("keydown", (e) => this.keyDown(e));

    return new Promise<number>((resolve) => {
      this._sent.subscribe((v) => v && resolve(this._index));
    });
  }
}
