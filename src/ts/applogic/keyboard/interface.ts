import type { App } from "../interface";

export interface AppKeyCombination {
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  key: string;
  action(app: App): void;
}

export type AppKeyCombinations = AppKeyCombination[];
