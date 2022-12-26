import type { App } from "../interface";
import logo from "../../../assets/apps/settings.svg";
import ProfilePicture from "../../../lib/Apps/ProfilePicture.svelte";

export const ProfilePictureApp: App = {
  info: {
    name: "Select Profile Picture",
    description: "Profile Picture Selector",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    hidden: true,
  },
  size: { w: 460, h: 434 },
  pos: { x: 30, y: 40 },
  minSize: { w: 460, h: 434 },
  maxSize: { w: 460, h: 434 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: ProfilePicture,
  glass: true,
};
