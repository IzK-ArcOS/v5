import { writable } from "svelte/store";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean; //done
      labels: boolean; //done
      pos: "vertical" | "" | "vertical-right";
      docked: boolean; //done
    };

    window: {
      bigtb: boolean; //done
      lefttb: boolean; //done
      traffic: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
      theme: "light" | "dark";
      sharp: boolean;
    };

    start: {
      small: boolean; //done
    };

    anim: boolean; //done
    noGlass: boolean; //done
    noQuickSettings: boolean;
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

export const defaultUserData: UserData = {
  sh: {
    taskbar: {
      centered: false,
      labels: false,
      pos: "",
      docked: true,
    },
    window: {
      lefttb: false,
      bigtb: true,
      traffic: false,
    },
    desktop: {
      wallpaper: "img06",
      icons: true,
      theme: "dark",
      sharp: false,
    },
    start: {
      small: true,
    },
    anim: true,

    noQuickSettings: false,
    noGlass: false,
  },
  acc: {
    enabled: true,
    admin: false,
    profilePicture: 3,
  },
  volume: {
    level: 100,
    muted: false,
  },
  disabledApps: [],
  autoRun: [],
  autoLoads: [],
  askPresist: true,
  devmode: false,
  appdata: {},
};

export type AllUsers = { [name: string]: UserData };
export const UserData = writable<UserData>(defaultUserData);
export const UserName = writable<string>("ArcOS");
export const UserToken = writable<string>();
