import { writable } from "svelte/store";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean;
      labels: boolean;
      pos: "top" | "bottom";
      docked: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
    };

    start: {
      small: boolean;
    };

    anim: boolean;
    titleButtonsLeft: boolean;
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
      docked: false,
    },
    desktop: {
      wallpaper: null,
      icons: true,
    },
    start: {
      small: true,
    },
    anim: true,
    titleButtonsLeft: false,
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