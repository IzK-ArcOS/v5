import { Log, LogLevel } from "../console";
import { AppInfo } from "./apps/AppInfo";
import { AppManager } from "./apps/AppManager";
import { AppPoker } from "./apps/AppPoke";
import { CalculatorApp } from "./apps/Calculator";
import { DidYouKnow } from "./apps/DidYouKnow";
import { ErrorCreator } from "./apps/ErrorCreator";
import { Exit } from "./apps/Exit";
import { LoggerApp } from "./apps/Logger";
import { ProfilePictureApp } from "./apps/ProfilePicture";
import { SettingsApp } from "./apps/settings";
import { TestApp } from "./apps/testApp";
import { openWindow } from "./events";
import type { App } from "./interface";
import { loadWindow } from "./load";
import { updateStores } from "./store";

export const DefaultApps: { [key: string]: App } = {
  TestApp: TestApp,
  SettingsApp: SettingsApp,
  AppMan: AppManager,
  AppPoker: AppPoker,
  //UITroubleShooter: UITester,
  Exit: Exit,
  ErrCre: ErrorCreator,
  PfpSelector: ProfilePictureApp,
  AppInfo,
  DidYouKnow,
  LoggerApp,
  CalculatorApp,
};

export const SystemApps: string[] = [
  "AppMan",
  "Exit",
  "SettingsApp",
  "PfpSelector",
  "AppInfo",
  "LoggerApp",
];

export async function importDefault(open = false) {
  Log({
    msg: `Importing default applications`,
    source: "imports.ts: importDefault",
    level: LogLevel.info,
  });

  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    await loadWindow(...entries[i]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
