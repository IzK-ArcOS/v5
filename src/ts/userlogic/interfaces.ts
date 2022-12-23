import { writable } from "svelte/store";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean;
      labels: boolean;
      pos: "top" | "bottom";
      docked: boolean; //done
    };

    window: {
      bigtb: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
    };

    start: {
      small: boolean; //done
    };

    anim: boolean; //done
    titleButtonsLeft: boolean;
    noGlass: boolean;
  };

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
      bigtb: true,
    },
    desktop: {
      wallpaper: null,
      icons: true,
    },
    start: {
      small: false,
    },
    anim: true,
    titleButtonsLeft: false,
    noGlass: false,
  },
  acc: {
    enabled: true,
    admin: false,
    profilePicture: null,
  },
  volume: {
    level: 100,
    muted: false,
  },
};

export type AllUsers = { [name: string]: UserData };
export const UserData = writable<UserData>();
export const UserName = writable<string>();
