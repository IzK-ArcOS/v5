import CustomLoginWallpaper from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/CustomLoginWallpaper.svelte";

export const LockScreenOverlays = {
  customLoginWallpaper: {
    info: {
      name: "Custom Login Wallpaper",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomLoginWallpaper,
    size: { w: 370, h: 126 },
    show: false,
  },
};

export default LockScreenOverlays;
