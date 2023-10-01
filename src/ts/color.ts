import { Log } from "./console";

// @source https://stackoverflow.com/a/59387478
export function lightenColor(color: string, modifier: number = 0.35) {
  Log(
    "ts/color.ts: lightenColor",
    `Lightening ${color} using a modifier of ${modifier}`
  );

  const hex = color.replace("#", "");
  const RGB = [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];

  let result = "#";

  RGB.forEach((color) => {
    result += Math.round(
      (255 - color) * (1 - Math.pow(Math.E, -modifier)) + color
    ).toString(16);
  });

  return result;
}
