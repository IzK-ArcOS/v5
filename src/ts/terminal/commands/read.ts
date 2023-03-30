import { getSwitches, switchExists } from "../argv";
import type { Command } from "../interface";

export const Read: Command = {
  keyword: "read",
  async exec(cmd, argv, term) {
    const switches = getSwitches(argv);
    const prompt = switches["prompt"] || "?";
    const key = switches["var"];
    const mask = switchExists(argv, "mask");

    if (!key) term.std.Error("Missing variable");

    const value = await term.std.read(`${prompt} `, "", 100, mask);
    const setter = term.vars.set(key, value);

    if (!setter) term.std.Error("Unable to set variable: it is read-only!");
  },
  description: "Read user input to a variable",
  syntax: "--[var]=[variable] --[mask]? --[prompt]?=[...]",
};
