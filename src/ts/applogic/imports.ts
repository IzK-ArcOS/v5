import { AppInfo } from "./apps/AppInfo";
import { AppManager } from "./apps/AppManager";
import { AppPoker } from "./apps/AppPoke";
import { DidYouKnow } from "./apps/DidYouKnow";
import { ErrorCreator } from "./apps/ErrorCreator";
import { Exit } from "./apps/Exit";
import { ProfilePictureApp } from "./apps/ProfilePicture";
import { SettingsApp } from "./apps/settings";
import { TestApp } from "./apps/testApp";
import { UITester } from "./apps/testApp2";
import { openWindow } from "./events";
import type { App } from "./interface";
import { loadWindow } from "./load";
import { updateStores } from "./store";

export const DefaultApps: { [key: string]: App } = {
  TestApp: TestApp,
  AppMan: AppManager,
  AppPoker: AppPoker,
  UITroubleShooter: UITester,
  Exit: Exit,
  ErrCre: ErrorCreator,
  SettingsApp: SettingsApp,
  PfpSelector: ProfilePictureApp,
  AppInfo,
  DidYouKnow,
};

export const SystemApps: string[] = [
  "AppMan",
  "Exit",
  "SettingsApp",
  "PfpSelector",
  "AppInfo",
];

export async function importDefault(open = false) {
  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    await loadWindow(...entries[i]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
