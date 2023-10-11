import SaveTheme from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/SaveTheme.svelte";

export const ThemeOverlays = {
  saveTheme: {
    info: {
      name: "Save Theme",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: SaveTheme,
    size: { w: 450, h: 170 },
    show: false,
  },
};
