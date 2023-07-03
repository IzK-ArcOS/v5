import { Log, LogLevel } from "../../console";
import img04 from "../../../assets/bg/img04.png";
import { Wallpapers } from "./store";
import type { Wallpaper } from "./interface";
import { readFile } from "../../api/fs/file";
import { get } from "svelte/store";
import { UserName } from "../interfaces";

const getters: [string, (id: string) => Wallpaper | Promise<Wallpaper>][] = [
  [
    "@local:",
    async (id) => await wallpaperFromFS(atob(id.replace("@local:", ""))),
  ],
  ["img", (id) => Wallpapers[id] || Wallpapers["img04"]],
];

export async function getWallpaper(id: string) {
  Log({
    msg: `Getting wallpaper ${id.startsWith("img") ? id : "<custom>"}`,
    source: "userlogic/wallpapers.ts: getWallpaper",
    level: LogLevel.info,
  });

  if (!id) return Wallpapers["img04"];

  for (let i = 0; i < getters.length; i++) {
    if (id.startsWith(getters[i][0])) return await getters[i][1](id);
  }

  return Wallpapers["img04"];
}

export async function wallpaperFromFS(path: string): Promise<Wallpaper> {
  Log({
    source: "wallpapers.ts: wallpaperFromFS",
    msg: `Reading wallpaper from path "${path}"...`,
    level: LogLevel.info,
  });

  const file = await readFile(path);

  if (!file) {
    Log({
      source: "wallpapers.ts: wallpaperFromFS",
      msg: `Unable to get wallpaper "${path}"`,
      level: LogLevel.error,
    });

    return Wallpapers["img04"];
  }

  const url = URL.createObjectURL(
    new Blob([new Uint8Array(file)], { type: "image/jpeg" })
  );

  return { url, author: get(UserName), name: url, source: "" };
}
