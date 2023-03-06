import { get } from "svelte/store";
import { UserData, UserName } from "../interfaces";
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

export function saveCurrentTheme(name: string) {
  const id = `${Math.floor(Math.random() * 1e6)}`;

  const udata = get(UserData);
  const context: UserTheme = {
    version: "1.0.0",
    name,
    author: get(UserName),
    anim: udata.sh.anim,
    noGlass: udata.sh.noGlass,
    sharp: udata.sh.desktop.sharp,
    theme: udata.sh.desktop.theme,
    wallpaper: udata.sh.desktop.wallpaper,
    accent: udata.sh.desktop.accent,
    docked: udata.sh.taskbar.docked,
    taskbarCentered: udata.sh.taskbar.centered,
    taskbarLabels: udata.sh.taskbar.labels,
    taskbarPosition: udata.sh.taskbar.pos,
    smallStart: udata.sh.start.small,
    titleButtons: udata.sh.window.buttons,
    titlebarLarge: udata.sh.window.bigtb,
    titlebarLeft: udata.sh.window.lefttb,
  };

  if (!udata.sh.userThemes) udata.sh.userThemes = {};

  udata.sh.userThemes[id] = context;

  UserData.set(udata);
}

export function deleteCustomTheme(id: string) {
  const udata = get(UserData);

  if (!udata.sh.userThemes || !udata.sh.userThemes[id]) return false;

  delete udata.sh.userThemes[id];

  UserData.set(udata);

  return true;
}
