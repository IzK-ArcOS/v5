import { ArcOSVersion } from "../env/main";
import type { ArcTerm } from "./main";

export function ArcTermIntro(term: ArcTerm) {
  if (!term.env.logo) return;

  const x = [
    "   [_]         _____            ",
    "  [/_\\]  _ _ _|_   _|__ _ _ _ __ ",
    " [/ _ \\]| '_/ _|| |/ -_) '_| '  \\",
    "[/_/ \\_\\]_| \\__||_|\\___|_| |_|_|_|",
  ];

  for (let i = 0; i < x.length; i++) {
    term.std.writeColor(x[i], "blue");
  }

  term.std.writeLine("\n");
}
