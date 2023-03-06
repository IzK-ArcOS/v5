import { get } from "svelte/store";
import { UserData } from "../interfaces";
import type { UserTheme } from "./interface";

export function loadTheme(context: UserTheme) {
  const udata = get(UserData);

  udata.sh.anim = context.anim;
  udata.sh.noGlass = context.noGlass;
  udata.sh.desktop.sharp = context.sharp;
  udata.sh.desktop.theme = context.theme;
  udata.sh.desktop.wallpaper = context.wallpaper;
  udata.sh.desktop.accent = context.accent;
  udata.sh.taskbar.docked = context.docked;
  udata.sh.taskbar.centered = context.taskbarCentered;
  udata.sh.taskbar.labels = context.taskbarLabels;
  udata.sh.taskbar.pos = context.taskbarPosition;
  udata.sh.start.small = context.smallStart;
  udata.sh.window.buttons = context.titleButtons;
  udata.sh.window.bigtb = context.titlebarLarge;
  udata.sh.window.lefttb = context.titlebarLeft;

  UserData.set(udata);
}
