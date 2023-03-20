import { ArcOSVersion } from "../env/main";
import type { ArcTerm } from "./main";

export function ArcTermIntro(term: ArcTerm) {
  if (term.env.noLogo == "yes") return;

  const x = [
    "   [_]         _____            ",
    "  [/_\\]  _ _ _|_   _|__ _ _ _ __ ",
    " [/ _ \\]| '_/ _|| |/ -_) '_| '  \\",
    "[/_/ \\_\\]_| \\__||_|\\___|_| |_|_|_|",
  ];

  for (let i = 0; i < x.length; i++) {
    term.util.writeColor(x[i], "blue");
  }

  term.util.writeLine("");
}
