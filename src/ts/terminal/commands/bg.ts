import { Wallpapers } from "../../userlogic/wallpapers/store";
import type { Command } from "../interface";

export const BgCommand: Command = {
  keyword: "bgs",
  exec(cmd, argv, term) {
    const backgrounds = Wallpapers;

    const entries = Object.keys(backgrounds).sort((a, b) => (a < b ? -1 : 1));

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = [entries[i], backgrounds[entries[i]]];
      const keyStr = key.padStart(6, " ");
      const nameStr = value.name.padEnd(30, " ");

      term.std.writeColor(
        `${keyStr}: [${nameStr}] by ${value.author}`,
        "purple"
      );
    }
  },
  description: "List ArcOS Backgrounds",
};
