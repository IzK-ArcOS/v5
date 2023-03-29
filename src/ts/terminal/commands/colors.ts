import type { Color, Command } from "../interface";

export const Colors: Command = {
  keyword: "colors",
  exec(cmd, argv, term) {
    const str =
      argv.join(" ").trim() || "The quick brown fox jumps over the lazy dog.";

    const colors: Color[] = [
      "gray",
      "white",
      "red",
      "orange",
      "yellow",
      "green",
      "aqua",
      "blue",
      "purple",
    ];

    for (let i = 0; i < colors.length; i++) {
      term.std.writeColor(`${colors[i].padEnd(10, " ")}: [${str}]`, colors[i]);
    }
  },
  description: "Print out all ArcTerm colors",
  syntax: "([sample?])",
};
