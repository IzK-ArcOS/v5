export interface UserTheme {
  author: string;
  version: string;
  name: string;
  /** */
  anim: boolean;
  noGlass: boolean;
  sharp: boolean;
  theme: string;
  wallpaper: string;
  taskbarCentered: boolean;
  taskbarLabels: boolean;
  taskbarPosition: "vertical" | "" | "vertical-right";
  docked: boolean;
  accent: string;
  smallStart: boolean;
  titleButtons: string;
  titlebarLeft: boolean;
  titlebarLarge: boolean;
  titlebarCentered: boolean;
  taskbarColored: boolean;
  isLauncher: boolean;
}

export type ThemeStore = { [key: string]: UserTheme };
