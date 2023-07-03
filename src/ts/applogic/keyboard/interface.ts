import type { App } from "../interface";

export interface AppKeyCombination {
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  key?: string;
  action(pid: number): void;
  global?: boolean;
}

export type AppKeyCombinations = AppKeyCombination[];
