import img01 from "../../assets/bg/img01.png";
import img02 from "../../assets/bg/img02.png";
import img03 from "../../assets/bg/img03.png";
import img04 from "../../assets/bg/img04.jpg";
import img05 from "../../assets/bg/img05.png";
import img09 from "../../assets/bg/img09.jpg";
import img10 from "../../assets/bg/img10.jpg";
import img11 from "../../assets/bg/img11.png";
import img12 from "../../assets/bg/img12.png";
import img13 from "../../assets/bg/img13.png";
import img14 from "../../assets/bg/img14.png";
import img15 from "../../assets/bg/img15.png";

export const Wallpapers: { [key: string]: string } = {
  img01,
  img02,
  img03,
  img04,
  img05,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
};

export function getWallpaper(id: string) {
  if (!id) return id;
  if (id.startsWith("img")) return Wallpapers[id] || img11;
  return id;
}
