import { Log } from "./console";

export function tryParse(content: string): any | false {
  Log("ts/bugrep.ts: tryParse", `content`);
  try {
    return JSON.parse(content);
  } catch {
    return false;
  }
}
