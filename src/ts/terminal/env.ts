import { Log, LogLevel } from "../console";
import { ArcOSVersion } from "../env/main";
import { ArcTermConfig } from "./config";
import type { Color } from "./interface";
import type { ArcTerm } from "./main";

export class ArcTermEnv {
  config: ArcTermConfig;
  prompt = "[&u]: [~/&p] $ ";
  promptColor: Color = "green";
  greeting = `ArcTerm & ArcOS v${ArcOSVersion}\n\nLicensed under GPLv3. Created by the ArcOS team.`;
  logo: boolean = true;

  constructor(term: ArcTerm) {
    Log({
      source: "terminal/env.ts",
      msg: `creating new ArcTermEnv for ${term.referenceId}`,
      level: LogLevel.info,
    });

    this.config = new ArcTermConfig(this);
  }
}
