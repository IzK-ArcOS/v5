import logo from "../../../assets/apps/messaging.svg";
import MessagingAppSvelte from "../../../lib/Apps/MessagingApp.svelte";
import type { App } from "../interface";

export const MessagingApp: App = {
  info: {
    name: "Messaging",
    description: "Send messages to other ArcOS users",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    onlineOnly: true,
  },
  size: { w: 600, h: 450 },
  pos: { x: 100, y: 100 },
  minSize: { w: 600, h: 450 },
  maxSize: { w: 1000, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: MessagingAppSvelte,
  glass: true,
};
