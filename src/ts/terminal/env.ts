import { ArcOSVersion } from "../env/main";
import { ArcTermConfig } from "./config";
import type { Color } from "./interface";

export class ArcTermEnv {
  config: ArcTermConfig;
  prompt = "[&u]: [~/&p] $ ";
  promptColor: Color = "green";
  greeting = `ArcTerm & ArcOS v${ArcOSVersion}\n\nLicensed under GPLv3. Created by the ArcOS team.`;
  width = 700;
  height = 420;
  noLogo: "yes" | "no" = "no";

  constructor() {
    this.config = new ArcTermConfig(this);
  }
}
