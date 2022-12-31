import { writable } from "svelte/store";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean; //done
      labels: boolean; //done
      pos: "top" | "bottom";
      docked: boolean; //done
    };

    window: {
      bigtb: boolean; //done
      lefttb: boolean; //done
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
    };

    start: {
      small: boolean; //done
    };

    anim: boolean; //done
    noGlass: boolean; //done
  };

  disabledApps: string[];
  autoRun: string[];

  acc: {
    enabled: boolean;
    admin: boolean;
    profilePicture: string | number | null;
  };
  volume: {
    level: number;
    muted: boolean;
  };
}

export const defaultUserData: UserData = {
  sh: {
    taskbar: {
      centered: false,
      labels: false,
      pos: "bottom",
      docked: true,
    },
    window: {
      lefttb: false,
      bigtb: true,
    },
    desktop: {
      wallpaper: "img11",
      icons: true,
    },
    start: {
      small: false,
    },
    anim: true,

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
};

export type AllUsers = { [name: string]: UserData };
export const UserData = writable<UserData>();
export const UserName = writable<string>();
