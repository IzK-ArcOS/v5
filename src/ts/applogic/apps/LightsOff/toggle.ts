import { get } from "svelte/store";
import { LOGrid, LOContainsLights } from "./grid";
import { LOClicks } from "./game";
import { checkNextLevel } from "./grid/levels";

const xModifiers = [-1, 0, +1];
const yModifiers = [-1, +1];

export function SwitchLightsState(x: number, y: number) {
  const grid = get(LOGrid);

  if (!grid[y]) throw new Error(`y doesn't exist ${y}`);
  if (typeof grid[y][x] !== "boolean")
    throw new Error(`x doesn't exist ${y} ${x}`);

  LOClicks.set(get(LOClicks) + 1);

  for (let i = 0; i < xModifiers.length; i++) {
    const value = grid[y][x + xModifiers[i]];

    if (typeof value !== "boolean") continue;

    grid[y][x + xModifiers[i]] = !value;
  }

  for (let i = 0; i < yModifiers.length; i++) {
    const rowExists = Array.isArray(grid[y + yModifiers[i]]);

    if (!rowExists) continue;
    const value = grid[y + yModifiers[i]][x];

    if (typeof value !== "boolean") continue;

    grid[y + yModifiers[i]][x] = !value;
  }

  LOGrid.set(grid);
}

LOGrid.subscribe((v) => {
  checkNextLevel();
});
