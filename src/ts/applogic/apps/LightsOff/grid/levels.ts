import { get, writable } from "svelte/store";
import { LOFinish } from "../finish";
import { LOClicks } from "../game";
import { LOGrid, LOContainsLights } from "../grid";
import type { LightsOffGrid } from "../interface";

export let LO_LEVEL = writable<number>(0);

export const LOLevels: LightsOffGrid[] = [
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
    [true, true, false, true, false],
  ],
  [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
  ],
];

export function loadLevel(level: number) {
  console.log(loadLevel, level, LOLevels.length);
  if (level >= LOLevels.length) return LOFinish();
  if (!LOLevels[level]) return;

  LOGrid.set(JSON.parse(JSON.stringify(LOLevels[level])));
  LO_LEVEL.set(level);
  LOClicks.set(0);
}
export function checkNextLevel() {
  if (LOContainsLights() || get(LOClicks) == 0) return false;

  LO_LEVEL.set(get(LO_LEVEL) + 1);

  if (get(LO_LEVEL) > LOLevels.length) return LOFinish();

  loadLevel(get(LO_LEVEL));

  return true;
}
