import { Log } from "./console";
import { LogLevel } from "./console/interface";

export function tryParse(content: string): any | false {
  Log("ts/bugrep.ts: tryParse", `content`);
  try {
    return JSON.parse(content);
  } catch {
    return false;
  }
}
