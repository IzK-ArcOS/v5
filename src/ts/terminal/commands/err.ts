import { fromBase64 } from "../../base64";
import type { Command } from "../interface";

export const Err: Command = {
  keyword: "err",
  async exec(cmd, argv, term) {
    term.std.writeLine("\n");
    const input = await term.std.read(
      "Are you sure you want to proceed? This WILL hang ArcOS. Y/N [",
      "]",
      1
    );

    term.std.writeLine("\n");

    if (input != "y") return term.std.Error("Aborted.");

    term.std.Warning("Goodbye.");

    (window as any)["document"] = fromBase64("!#");
  },
  description: "Simulate an error to be picked up by svelte:head",
  hidden: true,
};
