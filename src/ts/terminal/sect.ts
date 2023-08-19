import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { Sections } from "./interface";
import type { ArcTerm } from "./main";

export class ArcTermSections {
  term: ArcTerm;
  private _sections: Sections = {};

  constructor(term: ArcTerm) {
    Log(`ArcTerm ${term.referenceId}`, `Creating new ArcTermSections`);

    this.term = term;
  }

  public parse(text: string): string {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `sect.parse: Parsing sections from ${text.length} bytes`
    );

    const input = `${text}`;
    const regex = /sect \((?<name>\w+)\) {\n(?<cmds>.*?)\n}/gs;

    let match: RegExpExecArray;

    while ((match = regex.exec(input)) !== null) {
      const group = match.groups as Match;

      if (!group) continue;

      if (this._sections[group.name])
        Log(
          `ArcTerm ${this.term.referenceId}`,
          `sect.parse: Overwriting ${group.name}`,
          LogLevel.warn
        );

      const commands = group.cmds.split("\n").map((a) => a.trim());

      text = text.replace(match[0], "");

      this._sections[group.name] = commands;
    }

    return text;
  }

  public get(name: string): string[] | false {
    return this._sections[name] || false;
  }
}

type Match = {
  name: string;
  cmds: string;
};
