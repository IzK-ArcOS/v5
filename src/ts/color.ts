import colorsea from "colorsea";

// @source https://stackoverflow.com/a/59387478
export function lightenColor(color: string, modifier: number = 0.35) {
  if (!color) color = "70D6FF";

  color = color.toString();

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

export function darkenColor(color: string, modifier: number = 5) {
  return colorsea(`#${color}`).darken(modifier, "relative").hex();
}

// @source https://stackoverflow.com/a/54569758
export function invertColor(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length !== 6) return hex;
  return `#${(Number(`0x1${hex}`) ^ 0xffffff)
    .toString(16)
    .substring(1)
    .toUpperCase()}`;
}
