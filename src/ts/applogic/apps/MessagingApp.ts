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
  },
  initialSize: { w: 700, h: 450 },
  minSize: { w: 700, h: 450 },
  maxSize: { w: 1000, h: 600 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  overlayApps: overlays,
  content: MessagingAppSvelte,
  glass: true,
};
