import { Log, LogLevel } from "../../../console";
import type { Tip } from "./interface";
import { DidYouKnowTips } from "./store";

// Returns a random item from the DYK store
export function getRandomTip(): Tip {
  Log({
    msg: "Getting random tip",
    source: "apps/DidYouKnow: getRandomTip",
    level: LogLevel.info,
  });
  const t = DidYouKnowTips[Math.floor(Math.random() * DidYouKnowTips.length)];
  return t;
}
