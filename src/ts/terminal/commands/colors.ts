import type { Color, Command } from "../interface";

export const Colors: Command = {
  keyword: "colors",
  exec(cmd, argv, term) {
    const colors = [
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
      term.util.writeColor(
        `${colors[i].padEnd(
          10,
          " "
        )}: [The quick brown fox jumps over the lazy dog.]`,
        colors[i] as Color
      );
    }
  },
  description: "Print out all ArcTerm colors",
};
