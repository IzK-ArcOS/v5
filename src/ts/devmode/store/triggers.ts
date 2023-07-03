import { ConnectedServer } from "../../api/main";
import {
  FileBrowserCurrentDir,
  FileBrowserSelectedFilename,
} from "../../applogic/apps/FileBrowser/main";
import { currentSettingsPage } from "../../applogic/apps/SettingsApp/main";
import { AppStore } from "../../applogic/store";
import { ErrorProcesses } from "../../errorlogic/app";
import { CurrentFTSState } from "../../fts/main";
import { CurrentLoginState, loginUsername } from "../../login/main";
import { NotificationStore } from "../../notiflogic/main";
import { UserData, UserName } from "../../userlogic/interfaces";
import type { DevModeTriggers } from "../interface";

export const dmTriggers: DevModeTriggers = [
  AppStore,
  UserName,
  loginUsername,
  UserData,
  ConnectedServer,
  CurrentFTSState,
  CurrentLoginState,
  NotificationStore,
  currentSettingsPage,
  ErrorProcesses,
  FileBrowserSelectedFilename,
  FileBrowserCurrentDir,
];
