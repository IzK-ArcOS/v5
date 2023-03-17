import { ConnectedServer } from "../../api/main";
import {
  FileBrowserCurrentDir,
  FileBrowserDirContents,
  FileBrowserSelectedFilename,
} from "../../applogic/apps/FileBrowser/main";
import { currentSettingsPage } from "../../applogic/apps/SettingsApp/main";
import { OpenedStore, WindowStore } from "../../applogic/store";
import { log } from "../../console";
import { ErrorWindowStore as ErrStore } from "../../errorlogic/app";
import { CurrentFTSState } from "../../fts/main";
import { CurrentLoginState, loginUsername } from "../../login/main";
import { UserName } from "../../userlogic/interfaces";
import type { DevModeMutators } from "../interface";

export const dmMutators: DevModeMutators = [
  {
    caption: "WindowStore",
    store: WindowStore,
    value: "length",
    suffix: "apps",
  },
  {
    caption: "OpenedStore",
    store: OpenedStore,
    value: "length",
    suffix: "apps",
  },
  {
    caption: "ErrorStore",
    store: ErrStore,
    value: "length",
    suffix: "errors",
  },
  { caption: "UserName", store: UserName, fallback: "none" },
  { caption: "LoginUsername", store: loginUsername, fallback: "none" },
  { caption: "APIHost", store: ConnectedServer, fallback: "invalid" },
  {
    caption: "FTSState",
    store: CurrentFTSState,
    value: "key",
    fallback: "unloaded",
  },
  {
    caption: "LoginState",
    store: CurrentLoginState,
    value: "key",
    fallback: "unloaded",
  },
  {
    caption: "SettingsPage",
    store: currentSettingsPage,
    value: "name",
    fallback: "unopened",
  },
  { caption: "Log", store: log, value: "length", suffix: "entries" },
  { caption: "fbCurrent", store: FileBrowserCurrentDir },
  {
    caption: "fbSelected",
    store: FileBrowserSelectedFilename,
    fallback: "none",
  },
];
