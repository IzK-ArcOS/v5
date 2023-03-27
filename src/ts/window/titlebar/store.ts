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
    author: "ArcOS Team",
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
  pos: { x: 0, y: 0 },
  minSize: { w: 0, h: 0 },
  maxSize: { w: 0, h: 0 },
  size: { w: 0, h: 0 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: {
      fll: false,
      max: false,
      min: false,
    },
  },
  glass: false,
  content: null,
};
