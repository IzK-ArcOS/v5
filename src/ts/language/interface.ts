import type { Params } from "../api/interface";

export interface Language {
  code: string;
  name: string;
  definitions: LanguageDefinitions;
}

export type LanguageDefinitions = Params;

export interface LanguagePathStore {
  [key: string]: {
    path: string;
    name: string;
  };
}
