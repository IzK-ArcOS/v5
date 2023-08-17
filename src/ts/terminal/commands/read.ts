import { getSwitches, switchExists } from "../argv";
import type { Command } from "../interface";

export const Read: Command = {
  keyword: "read",
  async exec(cmd, argv, term) {
    const switches = getSwitches(argv);
    const prompt = switches["prompt"] || "?";
    const key = switches["var"];
    let max = switches["max"] as any;
    const mask = switchExists(argv, "mask");

    try {
      if (!!max) max = parseInt(max);
    } catch {
      return term.std.Error("--max must be a number.");
    }

    if (!key) return term.std.Error("Missing variable: use --var <variable>");

    const value = await term.std.read(`${prompt} `, "", max || 100, mask);
    const setter = term.vars.set(key, value);

    if (!setter) term.std.Error("Unable to set variable: it is read-only!");
  },
  help(term) {
    term.std.writeLine("Command parameters:");
    term.std.writeColor(
      "--[var] <[variable]>      The variable to write to",
      "blue"
    );
    term.std.writeColor(
      "--[mask]?               Masks the input (like a password)",
      "blue"
    );
    term.std.writeColor(
      "--[prompt]? <[string]>    The prompt to display to the user",
      "blue"
    );
    term.std.writeColor(
      "--[max]? <[number]>       The maximum input length",
      "blue"
    );
    term.std.writeColor("", "blue");
  },
  description: "Read user input to a variable",
  syntax:
    "--[var] <[variable]> --[mask]? --[prompt]? <[string]> --[max]? <[number]>",
};
