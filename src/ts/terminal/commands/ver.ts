import { ArcOSVersion } from "../../env/main";
import type { Command } from "../interface";

export const Ver: Command = {
  keyword: "ver",
  exec(cmd, argv, term) {
    term.util.writeColor(`ArcOS & ArcTerm [v${ArcOSVersion}]`, "blue");
  },
  description: "Display the version number",
};
