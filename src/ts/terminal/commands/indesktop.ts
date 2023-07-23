import { isDesktop } from "../../desktop/app";
import type { Command } from "../interface";

export const InDesktop: Command = {
  keyword: "indesktop",
  async exec(cmd, argv, term) {
    const is = isDesktop();

    term.std.writeColor(
      `[STATUS]: You are ${is ? "in the Desktop app" : "in the Web version"}`,
      "aqua"
    );
  },
  description: "Check if you are in the desktop app or not",
};
