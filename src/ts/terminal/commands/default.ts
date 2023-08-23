import type { Command } from "../interface";

export const Default: Command = {
  keyword: "default",
  async exec(cmd, argv, term) {
    if (!cmd || !term || !term.std || !term.std.verbose) return;

    if (!cmd.trim().replaceAll(" ", "")) return;

    const scriptPath = await term.scripts.detectScript(term.path, cmd);

    if (!scriptPath && term && term.std) {
      return term.std.Error(`${cmd}: command not found`);
    }

    await term.scripts.runScriptFile(scriptPath);
  },
  description: "Default command",
};
