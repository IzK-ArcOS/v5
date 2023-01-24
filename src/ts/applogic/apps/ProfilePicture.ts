import logo from "../../../assets/apps/pfpselector.svg";
import ProfilePicture from "../../../lib/Apps/ProfilePicture.svelte";
import type { App } from "../interface";

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
  size: { w: 345, h: 434 },
  pos: { x: 70, y: 80 },
  minSize: { w: 345, h: 434 },
  maxSize: { w: 345, h: 434 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: ProfilePicture,
  glass: true,
};
