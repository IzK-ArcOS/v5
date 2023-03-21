import { ArcOSVersion } from "../env/main";
import { ArcTermConfig } from "./config";
import type { Color } from "./interface";

export class ArcTermEnv {
  config: ArcTermConfig;
  prompt = "[&u]: [~/&p] $ ";
  promptColor: Color = "green";
  greeting = `ArcTerm & ArcOS v${ArcOSVersion}\n\nLicensed under GPLv3. Created by the ArcOS team.`;
  logo: boolean = true;

  constructor() {
    this.config = new ArcTermConfig(this);
  }
}
