import ChangeTitleButtons from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ChangeTitleButtons.svelte";
import CustomWallpaper from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/CustomWallpaper.svelte";

export const DesktopOverlays = {
  customWallpaper: {
    info: {
      name: "Custom Wallpaper",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomWallpaper,
    size: { w: 370, h: 126 },
    show: false,
  },
  changeTitleButtons: {
    info: {
      name: "Change Titlebar Buttons",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangeTitleButtons,
    size: { w: 400, h: 300 },
    show: false,
  },
};

export default DesktopOverlays;
