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
      source: `ArcTerm ${term.referenceId}`,
      msg: `Creating new ArcTermEnv`,
      level: LogLevel.info,
    });

    this.config = new ArcTermConfig(this, term);
  }
}
