import { getDirectory } from "../api/fs/directory";
import { readFile } from "../api/fs/file";
import { arrayToText } from "../api/fs/file/conversion";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { ArcTerm } from "./main";

export class ArcTermScripts {
  term: ArcTerm;

  constructor(term: ArcTerm) {
    Log(`ArcTerm ${term.referenceId}`, `Creating new ArcTermScripts`);

    this.term = term;
  }

  public async detectScript(directory: string, cmd: string) {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `scripts.detectScript: Detecting ${cmd} in ${directory}`
    );

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

    const d = arrayToText(file);
    const split = d.split("\n");

    return split[0].startsWith("#!arcterm");
  }

  public async runScriptFile(path: string) {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `scripts.runScriptFile: running ${path}`
    );

    const contents = await readFile(path);

    if (!contents)
      return Log(
        `ArcTerm ${this.term.referenceId}`,
        `scripts.runScriptFile: Error reading file ${path}`,
        LogLevel.error
      );

    const d = this.term.sect.parse(arrayToText(contents));
    const parts = d.split("\n").filter((l) => !!l);

    await this.term.input.processCommands(parts, path);
  }
}
