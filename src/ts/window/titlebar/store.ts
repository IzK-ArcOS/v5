import Default from "../../../lib/Page/Desktop/WindowStore/Window/Controls/Default.svelte";
import Traffic from "../../../lib/Page/Desktop/WindowStore/Window/Controls/Traffic.svelte";
import type { App } from "../../applogic/interface";
import type { WindowControls } from "./interface";
import dummyIcon from "../../../assets/apps/default.svg";
import Og from "../../../lib/Page/Desktop/WindowStore/Window/Controls/OG.svelte";

export const titlebarButtons: { [key: string]: WindowControls } = {
  default: {
    caption: "Default",
    author: "ArcOS Team",
    content: Default,
  },
  traffic: {
    caption: "Traffic Lights",
    author: "Apple",
    content: Traffic,
  },
  og: {
    caption: "O.G.",
    author: "WebOSv3 Team",
    content: Og,
  },
};

export const DummyApp: App = {
  info: {
    name: "Dummy",
    description: "I'm a dummy!",
    builtin: true,
    version: "1.0.0",
    author: "Robots",
    icon: dummyIcon,
  },
  minSize: { w: 0, h: 0 },
  maxSize: { w: 0, h: 0 },
  initialSize: { w: 0, h: 0 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: {
    fullscreen: false,
    maximized: false,
    minimized: false,
  },
  glass: false,
  content: null,
};
