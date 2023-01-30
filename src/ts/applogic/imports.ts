import { get } from "svelte/store";
import { ConnectedServer } from "../api/main";
import { Log, LogLevel } from "../console";
import { AppInfo } from "./apps/AppInfo";
import { AppManager } from "./apps/AppManager";
import { AppPoker } from "./apps/AppPoke";
import { CalculatorApp } from "./apps/Calculator";
import { DidYouKnow } from "./apps/DidYouKnow";
import { ErrorCreator } from "./apps/ErrorCreator";
import { Exit } from "./apps/Exit";
import { FileBrowserApp } from "./apps/FileBrowser";
import { ImageViewer } from "./apps/ImageViewer";
import { LoggerApp } from "./apps/Logger";
import { OpenWithApp } from "./apps/OpenWith";
import { SettingsApp } from "./apps/settings";
import { TestApp } from "./apps/testApp";
import { TextEditor } from "./apps/TextEditor";
import { openWindow } from "./events";
import type { App } from "./interface";
import { loadWindow } from "./load";
import { updateStores } from "./store";

export const DefaultApps: { [key: string]: App } = {
  TestApp: TestApp,
  SettingsApp: SettingsApp,
  AppMan: AppManager,
  AppPoker: AppPoker,
  Exit: Exit,
  ErrCre: ErrorCreator,
  AppInfo,
  DidYouKnow,
  LoggerApp,
  CalculatorApp,
  FileManager: FileBrowserApp,
  TextEditor,
  ImageViewer,
  OpenWithApp,
};

export const SystemApps: string[] = [
  "AppMan",
  "Exit",
  "SettingsApp",
  "PfpSelector",
  "AppInfo",
  "LoggerApp",
  "FileManager",
];

export async function importDefault(open = false) {
  Log({
    msg: `Importing default applications`,
    source: "imports.ts: importDefault",
    level: LogLevel.info,
  });

  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    if (!get(ConnectedServer) && entries[i][1].info.onlineOnly) {
      Log({
        msg: `Not importing "${entries[i][0]}": it requires an ArcAPI.`,
        source: `imports.ts: importDefault`,
        level: LogLevel.warn,
      });

      continue;
    }

    Log({
      msg: `Importing default application "${entries[i][0]}"...`,
      source: `imports.ts: importDefault`,
      level: LogLevel.info,
    });

    await loadWindow(...entries[i]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
