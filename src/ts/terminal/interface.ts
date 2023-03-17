import type { ArcTerm } from "./main";

export interface Command {
  keyword: string;
  description: string;
  exec: (cmd: string, argv: string[], term: ArcTerm) => boolean | void;
}

export type CommandStore = Command[];
