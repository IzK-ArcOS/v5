import { get } from "svelte/store";
import type { LightsOffGrid } from "./interface";
import type { LightsOffRuntime } from "./runtime";

export class LightsOffLevels {
  runtime: LightsOffRuntime;

  constructor(runtime: LightsOffRuntime) {
    this.runtime = runtime;
  }

  private _store: LightsOffGrid[] = [
    [
      [false, false, false, false, true],
      [false, false, false, true, true],
      [false, false, false, false, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, false, false, false, true],
      [true, true, false, true, true],
    ],
    [
      [true, true, false, true, true],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    [
      [false, true, false, false, false],
      [true, true, false, false, false],
      [false, true, true, true, false],
      [true, true, false, false, false],
      [false, true, false, false, false],
    ],
    [
      [true, false, false, false, true],
      [false, true, false, true, false],
      [false, true, false, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    [
      [true, true, true, false, false],
      [true, true, true, false, false],
      [true, false, true, true, false],
      [true, true, true, false, false],
      [true, true, true, false, false],
    ],
    [
      [true, true, false, false, false],
      [false, false, true, true, false],
      [false, false, true, false, false],
      [false, true, false, true, false],
      [true, true, false, true, true],
    ],
    [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [false, true, true, true, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
    ],
  ];

  loadLevel(level: number) {
    if (level >= this._store.length) return this.runtime.finish();
    if (!this._store[level]) return;

    this.runtime.Grid.set(JSON.parse(JSON.stringify(this._store[level])));
    this.runtime.LEVEL.set(level);
    this.runtime.Clicks.set(0);
  }
  checkNextLevel() {
    if (this.runtime.containsLights() || get(this.runtime.Clicks) == 0)
      return false;

    this.runtime.LEVEL.set(get(this.runtime.LEVEL) + 1);

    if (get(this.runtime.LEVEL) > this._store.length)
      return this.runtime.finish();

    this.loadLevel(get(this.runtime.LEVEL));

    return true;
  }
}
