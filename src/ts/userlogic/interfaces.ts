import { writable } from "svelte/store";
import type { ThemeStore } from "./themes/interface";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean; //done
      labels: boolean; //done
      pos: "vertical" | "" | "vertical-right";
      docked: boolean; //done
      colored: boolean;
      isLauncher: boolean;
    };

    window: {
      bigtb: boolean; //done
      lefttb: boolean; //done
      buttons: string;
      centertb: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
      theme: "light" | "dark" | string;
      sharp: boolean;
      accent: string;
      pinnedApps: string[];
      pinnedFolders: string[];
      pinnedFiles: string[];
    };

    start: {
      small: boolean; //done
    };

    anim: boolean; //done
    noGlass: boolean; //done
    noQuickSettings: boolean;
    userThemes?: ThemeStore;
    compactContext: boolean;
    showHiddenApps?: boolean;
  };

  disabledApps: string[];
  autoRun: string[];
  autoLoads: string[];
  askPresist: boolean;
  devmode: boolean;

  acc: {
    enabled: boolean;
    admin: boolean;
    profilePicture: string | number | null;
  };
  volume: {
    level: number;
    muted: boolean;
  };

  appdata: AppData;
}

export type AppData = {
  [key: string]: ScopedAppData;
};

export type ScopedAppData = {
  [key: string]: number | boolean | string | object;
};

export type AllUsers = { [name: string]: UserData };
export const UserData = writable<UserData>();
export const UserName = writable<string>();
export const UserToken = writable<string>();
