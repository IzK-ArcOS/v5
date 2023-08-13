import { readFile } from "../../api/fs/file";
import { arrayToText } from "../../api/fs/file/conversion";
import type { Command } from "../interface";

export const Default: Command = {
  keyword: "default",
  async exec(cmd, argv, term) {
    if (!cmd || !term || !term.std || !term.std.verbose) return;

    const scriptPath = await term.commandHandler.detectCommand(term.path, cmd);

    if (!scriptPath && term && term.std) {
      return term.std.Error(`${cmd}: command not found`);
    }

    const contents = await readFile(scriptPath);

    if (!contents)
      return term.std.Error(
        `Attempt to read script file [${scriptPath}] failed.`
      );

    const d = arrayToText(contents);
    const parts = d.split("\n");

    term.input.processCommands(parts, scriptPath);
  },
  description: "Default command",
};
