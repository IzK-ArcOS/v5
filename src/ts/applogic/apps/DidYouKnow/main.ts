import type { Tip } from "./interface";
import { DidYouKnowTips } from "./store";

export function getRandomTip(): Tip {
  const t = DidYouKnowTips[Math.floor(Math.random() * DidYouKnowTips.length)];
  console.log(t);
  return t;
}
