import { getDirectory } from "../api/fs/directory";
import { readFile } from "../api/fs/file";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { Default } from "./commands/default";
import type { ArcTerm } from "./main";
export class ArcTermCommandHandler {
  term: ArcTerm;
  history: string[] = [];

  constructor(term: ArcTerm) {
    Log(
      `ArcTerm ${term.referenceId}`,
      `Creating new ArcTermCommandHandler`,
      LogLevel.info
    );

    this.term = term;
  }

  public async evaluate(cmd: string, args?: string[]) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.evaluate: ${cmd}`);

    if (cmd.startsWith("#")) return;

    this.history.push(`${cmd} ${args.join(" ")}`.trim());

    const command = this.getCommand(cmd);

    if (this.term.input) this.term.input.current.disabled = true;

    await command.exec(cmd, args, this.term);

    if (!this.term.std || !this.term.input) return;
    if (this.term.std.verbose) this.term.std.writeLine("\n");

    this.term.input.unlock();
  }

  public getCommand(command: string) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.getCommand: ${command}`);

    const c = command.toLowerCase();

    for (let i = 0; i < this.term.commands.length; i++) {
      const k = this.term.commands[i].keyword.toLowerCase();

      if (k == c) return this.term.commands[i];
    }

    return Default;
  }

  public async detectCommand(directory: string, cmd: string) {
    const dir = await getDirectory(directory);

    if (!dir) return null;

    const files = dir.files;

    for (let i = 0; i < files.length; i++) {
      const name = files[i].filename;
      const path = files[i].scopedPath;

      if (name.startsWith(cmd) && (await this.isScriptFile(path))) return path;
    }
  }

  public async isScriptFile(path: string): Promise<boolean> {
    const file = await readFile(path);

    if (!file) return false;

    const enc = new TextDecoder("utf-8");
    const d = enc.decode(new Uint8Array(file));
    const split = d.split("\n");

    return split[0].startsWith("#!arcterm");
  }
}
