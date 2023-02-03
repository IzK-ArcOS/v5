import img01 from "@assets/bg/img01.png";
import img02 from "@assets/bg/img02.png";
import img03 from "@assets/bg/img03.png";
import img04 from "@assets/bg/img04.png";
import img05 from "@assets/bg/img05.png";
import img06 from "@assets/bg/img06.jpg";
import img07 from "@assets/bg/img07.jpg";
import img08 from "@assets/bg/img08.jpg";
import img09 from "@assets/bg/img09.png";
import img10 from "@assets/bg/img10.png";
import img11 from "@assets/bg/img11.jpg";
import img12 from "@assets/bg/img12.png";
import { Log, LogLevel } from "../console";

export const Wallpapers: { [key: string]: string } = {
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
};

export function getWallpaper(id: string) {
  Log({
    msg: `Getting wallpaper ${id.startsWith("img") ? id : "<custom>"}`,
    source: "userlogic/wallpapers.ts: getWallpaper",
    level: LogLevel.info,
  });

  if (!id) return id;
  if (id.startsWith("img")) return Wallpapers[id] || img04;
  return id;
}
