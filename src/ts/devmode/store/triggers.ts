import { ConnectedServer } from "../../api/main";
import {
  FileBrowserCurrentDir,
  FileBrowserSelectedFilename,
} from "../../applogic/apps/FileBrowser/main";
import { currentSettingsPage } from "../../applogic/apps/SettingsApp/main";
import { WindowStore } from "../../applogic/store";
import { ErrorWindowStore } from "../../errorlogic/app";
import { CurrentFTSState } from "../../fts/main";
import { CurrentLoginState, loginUsername } from "../../login/main";
import { NotificationStore } from "../../notiflogic/main";
import { UserData, UserName } from "../../userlogic/interfaces";
import type { DevModeTriggers } from "../interface";

export const dmTriggers: DevModeTriggers = [
  WindowStore,
  UserName,
  loginUsername,
  UserData,
  ConnectedServer,
  CurrentFTSState,
  CurrentLoginState,
  NotificationStore,
  currentSettingsPage,
  ErrorWindowStore,
  FileBrowserSelectedFilename,
  FileBrowserCurrentDir,
];
