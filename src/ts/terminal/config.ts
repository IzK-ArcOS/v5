import { readFile, writeFile } from "../api/fs/file";
import { errorMessage } from "../errorlogic/main";
import { createOverlayableError } from "../errorlogic/overlay";
import type { ArcTermEnv } from "./env";

export class ArcTermConfig {
  env: ArcTermEnv;

  constructor(e: ArcTermEnv) {
    this.env = e;

    this.loadConfigFile();
  }

  private readonly configPath = "./@arcterm";
  private readonly configKeys = ["prompt", "greeting", "width", "height"];

  public loadConfig(json: object) {
    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      if (this.env[k] && json[k]) this.env[k] = json[k];
    }
  }

  public async loadConfigFile() {
    const file = await readFile(this.configPath);

    if (!file) {
      this.fallbackError();

      return this.writeConfig();
    }

    const d = String.fromCharCode.apply(null, new Uint8Array(file));

    let json;

    try {
      json = JSON.parse(d);
    } catch {
      json = {};
    }

    this.loadConfig(json);
  }

  private async writeConfig() {
    const data = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      data[k] = this.env[k];
    }

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    await writeFile(this.configPath, blob);
  }

  private fallbackError() {
    errorMessage(
      "Configuration file not found",
      `Unable to find the configuration file used to change the functionality of ArcTerm. The default values have been applied and written to <code>${this.configPath}</code>.`,
      null,
      null,
      { caption: "Understood", action() {} }
    );
  }
}
