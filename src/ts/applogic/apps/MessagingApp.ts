import logo from "../../../assets/apps/messaging.svg";
import MessagingAppSvelte from "../../../lib/Apps/MessagingApp.svelte";
import Thread from "../../../lib/Apps/MessagingApp/Overlays/Thread.svelte";
import type { App, OverlayableApp } from "../interface";

const overlays: { [key: string]: OverlayableApp } = {
  thread: {
    info: {
      name: "Thread View",
      author: "ArcOS Team",
      version: "1.0.0",
    },
    size: { w: 550, h: 400 },
    show: false,
    content: Thread,
  },
};

export const MessagingApp: App = {
  info: {
    name: "Messaging",
    description: "Send messages to other ArcOS users",
    builtin: true,
    version: "1.0.7",
    author: "ArcOS Team",
    icon: logo,
    onlineOnly: true,
  },
  size: { w: 700, h: 450 },
  pos: { x: 100, y: 100 },
  minSize: { w: 700, h: 450 },
  maxSize: { w: 1000, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  overlays,
  content: MessagingAppSvelte,
  glass: true,
};
