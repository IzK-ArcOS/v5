import img0 from "../../assets/bg/img0.png";
import img01 from "../../assets/bg/img01.png";
import img02 from "../../assets/bg/img02.png";
import img03 from "../../assets/bg/img03.png";
import img04 from "../../assets/bg/img04.png";
import img05 from "../../assets/bg/img05.png";
import img06 from "../../assets/bg/img06.jpg";
import img07 from "../../assets/bg/img07.jpg";
import img08 from "../../assets/bg/img08.jpg";
import img09 from "../../assets/bg/img09.png";
import img10 from "../../assets/bg/img10.png";
import img11 from "../../assets/bg/img11.jpg";
import img12 from "../../assets/bg/img12.png";
import img13 from "../../assets/bg/img13.png";
import img14 from "../../assets/bg/img14.jpg";
import img15 from "../../assets/bg/img15.jpg";
import { readFile } from "../api/fs/file";
import { Log, LogLevel } from "../console";

export const Wallpapers: { [key: string]: string } = {
  img0,
  img04,
  img05,
  img01,
  img02,
  img03,
  img08,
  img13,
  img14,
  img15,
  img06,
  img07,
  img09,
  img10,
  img11,
  img12,
};
const getters: [string, (id: string) => string | Promise<string>][] = [
  [
    "@local:",
    async (id) => await wallpaperFromFS(atob(id.replace("@local:", ""))),
  ],
  ["img", (id) => Wallpapers[id] || img04],
];

export async function getWallpaper(id: string) {
  Log({
    msg: `Getting wallpaper ${id.startsWith("img") ? id : "<custom>"}`,
    source: "userlogic/wallpapers.ts: getWallpaper",
    level: LogLevel.info,
  });

  if (!id) return img04;

  for (let i = 0; i < getters.length; i++) {
    if (id.startsWith(getters[i][0])) return await getters[i][1](id);
  }

  return id;
}

export async function wallpaperFromFS(path: string) {
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

    return img04;
  }

  const url = URL.createObjectURL(
    new Blob([new Uint8Array(file)], { type: "image/jpeg" })
  );

  return url;
}
