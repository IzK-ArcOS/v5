import { readFile } from "../../api/fs/file";
import type { Command } from "../interface";

export const Default: Command = {
  keyword: "default",
  async exec(cmd, argv, term) {
    if (!cmd || !term || !term.std || !term.std.verbose)
      return term.std.Error(`${cmd}: command not found`);

    const scriptPath = await term.commandHandler.detectCommand(term.path, cmd);

    if (!scriptPath) {
      return term.std.Error(`${cmd}: command not found`);
    }

    const contents = await readFile(scriptPath);

    if (!contents)
      return term.std.Error(
        `Attempt to read script file [${scriptPath}] failed.`
      );

    const enc = new TextDecoder("utf-8");
    const d = enc.decode(new Uint8Array(contents));

    const parts = d.split("\n");

    term.input.processCommands(parts);
  },
  description: "Default command",
};
