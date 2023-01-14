import type { Writable } from "svelte/store";

export type DevModeProps = [string, number | string | boolean][];
export type WritableDevModeProps = Writable<DevModeProps>;
export type DevModeTriggers = Writable<any>[];
export type DevModeMutators = Mutator[];

export interface Mutator {
  store: Writable<any>;
  value?: string;
  suffix?: string;
  fallback?: string;
  caption: string;
}
