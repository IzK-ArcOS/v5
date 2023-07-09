import type { Command } from "../interface";

export const InDesktop: Command = {
  keyword: "indesktop",
  async exec(cmd, argv, term) {
    const is = false;

    term.std.writeColor(
      `[STATUS]: You are ${is ? "in the Desktop app" : "in the Web version"}`,
      "aqua"
    );
  },
  description: "Check if you are in the desktop app or not",
};
