import { get, writable, type Writable } from "svelte/store";
import type { LightsOffGrid } from "./interface";

export const LOGrid: Writable<LightsOffGrid> = writable([
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
]);

export function LOContainsLights() {
  return JSON.stringify(get(LOGrid)).includes("true");
}
